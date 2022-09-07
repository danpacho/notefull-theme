import path from "path"
import { cwd } from "process"
import { readFile, readdir } from "fs/promises"

import { MDXMetaType, MetaType, SeriesMetaType } from "@typing/post/meta"

import {
    PostType,
    PostControllerType,
    PostControllerInfoType,
    PostWithControllerType,
    AllPostOfSpecificCategoryType,
} from "@typing/post"
import { TableOfContentsType as PostTOCType } from "@lib/remark/getTableOfContents"

import { SeriesType, SeriesInfoType } from "@typing/post/series"

import { POST_FILE_NAME, MAC_OS_FILE_EXCEPTION } from "@constants/index"

import {
    blogContentsDir,
    addPathNotation,
    getValidateColor,
    removeFileFormat,
    definePlugins,
} from "@core/loader/util"

import { getAllCategoryName } from "@core/loader/category"

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "@core/error"

import matter from "gray-matter"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { getTableOfContents, remarkImageSizeByAlt } from "@lib/remark"

import rehypeKatex from "rehype-katex"
import rehypePrism from "rehype-prism-plus"
import { rehypeHeaderId, rehypeInjectCodeClassName } from "@lib/rehype"

import { bundleMDX } from "mdx-bundler"
import type { Pluggable } from "unified"

import { config } from "blog.config"

//* ----------------------------- 🔥 utils 🔥 -----------------------------
/**
 * sort dates in descending order
 * @param currDate `YYYY/MM/DD`
 * @param nextDate `YYYY/MM/DD`
 */
const sortByDate = (currDate: string, nextDate: string) => {
    const nextDateNumber = Number(nextDate.replace(/\//g, ""))
    const currDateNumber = Number(currDate.replace(/\//g, ""))

    if (currDateNumber < nextDateNumber) return 1
    if (currDateNumber > nextDateNumber) return -1
    return 0
}

const splitStringByComma = (text: string) =>
    text.split(",").map((text) => text.trim())

/**
 * @param tags extracted from `postFileName.mdx` at tags` meta
 * @returns transform `tags` to `string[]`
 */
const getTagArray = (tags: string, postFileName: string): string[] => {
    if (!tags)
        throw new BlogPropertyError({
            errorNameDescription: "Error Occured while extracting post meta",
            propertyName: "tags",
            propertyType: "string",
            errorDirectory: postFileName,
            propertyDescription:
                "tags: tag1, tag2, tag3, ... be sure to divide tag with , ",
        })

    return splitStringByComma(tags)
}
/**
 * @param metaArray {@link MetaType} any meta
 * @returns deduplicated unique meta
 */
const getUniqueTagFromMeta = (metaArray: MetaType[]) => {
    const deduplicatedSingleCategoryPageTagArray = [
        ...new Set(metaArray.flatMap(({ tags }) => tags)),
    ].sort()

    return deduplicatedSingleCategoryPageTagArray
}
//* ----------------------------- 🔥 extract post name 🔥 -----------------------------
interface CategoryPostFileNameType {
    category: string
    allCategoryPostFileName: string[]
}
/**
 * @param allCategoryName all category name
 * @returns `category`: category name
 * @returns `categoryPostFileNameArray`: `postFileName` of category
 */
const extractAllPostFileName = async (
    allCategoryName: string[]
): Promise<CategoryPostFileNameType[]> => {
    const allPostFileName = await Promise.all(
        allCategoryName.map(async (category) => {
            const postDir = `${blogContentsDir}/${category}/${POST_FILE_NAME}`
            try {
                const allCategoryPostFileName = (
                    await readdir(postDir, "utf-8")
                ).filter((fileName) => fileName !== MAC_OS_FILE_EXCEPTION)
                const data: CategoryPostFileNameType = {
                    category,
                    allCategoryPostFileName,
                }
                return data
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription:
                        "[category -> posts] directory name 📝 incorrection",
                    message: `Track file's directory: ${postDir}`,
                })
            }
        })
    )
    return allPostFileName
}
//* ----------------------------- 🔥 bundler 🔥 -----------------------------
type Awaited<T> = T extends Promise<infer PromiseT> ? Awaited<PromiseT> : T
type MetaObjT = { [key: string]: any }
type BundledResult<MetaT extends MetaObjT> = Awaited<
    ReturnType<typeof bundleMDX<MetaT>>
>

/**
 * bundling MDX source with mdx-bundler
 */
const bundlePost = async <MetaT extends MetaObjT>({
    postSource,
    customPlugin,
}: {
    postSource: string
    customPlugin: {
        rehypePlugins: Pluggable[]
        remarkPlugins: Pluggable[]
    }
}): Promise<{
    bundledResult: BundledResult<MetaT>
    toc: PostTOCType[]
}> => {
    //* ES Build env config: https://www.alaycock.co.uk/2021/03/mdx-bundler#esbuild-executable
    if (process.platform === "win32") {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            "node_modules",
            "esbuild",
            "esbuild.exe"
        )
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(
            process.cwd(),
            "node_modules",
            "esbuild",
            "bin",
            "esbuild"
        )
    }

    const bundledResult: BundledResult<MetaT> = await bundleMDX<MetaT>({
        source: postSource,
        cwd: path.join(cwd(), "src/components"),
        mdxOptions(options, frontmatter) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                ...customPlugin.remarkPlugins,
            ]
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                ...customPlugin.rehypePlugins,
            ]
            return options
        },
    })

    if (!bundledResult)
        throw new BlogFileExtractionError({
            errorNameDescription: "MDX Bundle Error",
            readingFileFormat: ".mdx",
            readingFileLocation: "❓",
            readingFileName: "❓",
        })

    const toc: PostTOCType[] = getTableOfContents(postSource) //* toc on server-side

    return {
        bundledResult,
        toc,
    }
}
//* ----------------------------- 🔥 meta 🔥 -----------------------------
/**
 * @param seriesString `{seriesTitle}-{order}`, should follow this format
 * @param postFileName file name of post
 * @returns `seriesTitle`
 * @returns `order`
 */
const transformStringToSeriesMeta = (
    seriesString: string,
    postFileName: string
): SeriesMetaType => {
    const splitedSeriesString = seriesString.split("-")

    // Not correct series string
    if (splitedSeriesString.length !== 2)
        throw new BlogPropertyError({
            propertyName: "series",
            propertyType: "string",
            errorDirectory: postFileName,
            errorNameDescription: "series meta type error",
            propertyDescription: `your input -> series: ${seriesString}`,
            customeErrorMessage:
                "Should follow format: < series: [series_title: string]-[series_order: number] >",
        })
    const [seriesTitle, seriesOrder] = splitedSeriesString

    // Not correct series order
    if (isNaN(Number(seriesOrder)))
        throw new BlogPropertyError({
            propertyName: "series",
            propertyType: "string",
            errorDirectory: postFileName,
            errorNameDescription: "series meta type error",
            customeErrorMessage:
                "Should follow format: < series: [series_title: string]-[series_order: number] >",
            propertyDescription: `series: ${seriesTitle}-${seriesOrder}`,
        })

    const series: SeriesMetaType = {
        seriesTitle,
        order: Number(seriesOrder),
    }
    return series
}

const generateMeta = ({
    extractedMeta,
    category,
    postFileName,
}: {
    extractedMeta: MDXMetaType
    category: string
    postFileName: string
}): MetaType | void => {
    if (Boolean(extractedMeta.postpone) === true) return // don't have to generate meta when postpone === true

    const meta = {
        ...extractedMeta,
        postUrl: "", // temporary set empty string for pagination
        postOrder: 0, // temporary set 0 for pagination
        category,
        postFileName,
        postpone: false,
        tags: getTagArray(extractedMeta.tags, postFileName),
        reference: extractedMeta?.reference
            ? splitStringByComma(extractedMeta.reference)
            : null,
        color: getValidateColor(extractedMeta.color),
        series: extractedMeta?.series
            ? transformStringToSeriesMeta(extractedMeta.series, postFileName)
            : null,
    } as MetaType

    const validatedMeta = Object.entries(meta)
        .filter(([_, value]) => !value)
        .filter(([key, _]) => key === "postpone") // postpone is not required
        .filter(([key, _]) => key === "reference") // reference is not required
        .filter(([key, _]) => key === "postOrder") // postOrder is not required
        .filter(([key, _]) => key === "bannerUrl") // bannerUrl is not required
        .map(([metaKey, metaValue]) => ({
            metaKey,
            metaValue,
        })) as {
        metaKey?: keyof MetaType
        metaValue: string
    }[]

    if (validatedMeta.length !== 0)
        throw new BlogPropertyError<MetaType>({
            propertyName: validatedMeta[0].metaKey!,
            propertyType: "string",
            errorDirectory: postFileName,
            errorNameDescription: "extracting post meta",
            errorPropertyValue: validatedMeta[0].metaValue,
            customeErrorMessage: "[  ⬇️ post meta info ⬇️  ]",
        })

    return meta
}
/**
 * @property `updateMeta.postUrl`: update `postUrl` for pagination
 * @returns updated postUrl with pagination order
 * @property `updateMeta.postOrder`: update `postOrder`
 */
const updateMeta = {
    postUrl: (meta: MetaType, order: number): MetaType => {
        const paginationOrder = Math.floor(
            order / config.postPerCategoryPage + 1
        )
        const fileName = removeFileFormat(meta.postFileName, "mdx")
        return {
            ...meta,
            postUrl: `/${meta.category}/${paginationOrder}/${fileName}`,
        }
    },
    postOrder: (meta: MetaType, order: number): MetaType => ({
        ...meta,
        postOrder: order,
    }),
}

/**
 * extract meta with `matter` package from `{postFileName}.mdx`
 */
const extractSingleMeta = async ({
    category,
    postFileName,
}: {
    category: string
    postFileName: string
}) => {
    const dir = `${blogContentsDir}/${category}/${POST_FILE_NAME}/${postFileName}`
    try {
        const source = await readFile(dir, "utf-8")
        if (!source)
            throw new BlogFileExtractionError({
                errorNameDescription: "post file",
                readingFileFormat: ".mdx",
                readingFileLocation: dir,
                readingFileName: postFileName,
            })
        const extractedMeta = matter(source).data as MDXMetaType

        const meta = generateMeta({
            extractedMeta,
            category,
            postFileName,
        })

        return meta
    } catch (err: unknown) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription: "meta extraction error",
            message: `Track meta file's directory: ${dir}`,
        })
    }
}

/**
 * if `postpone` to true, post will not included
 */
const extractAllMeta = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
) => {
    const allMeta = (
        await Promise.all(
            categoryPostFileNameArray.map(
                ({
                    category,
                    allCategoryPostFileName: categoryPostFileNameArray,
                }) =>
                    categoryPostFileNameArray.reduce<Promise<MetaType[]>>(
                        async (acc, postFileName) => {
                            const meta = await extractSingleMeta({
                                category,
                                postFileName,
                            })
                            if (meta) return [...(await acc), meta]

                            return await acc
                        },
                        Promise.resolve([] as MetaType[])
                    )
            )
        )
    )
        .map(
            (unUpdatedAllPostMeta) =>
                unUpdatedAllPostMeta
                    .sort((prev, curr) => sortByDate(prev.update, curr.update)) //* update: sort by date
                    .map(updateMeta.postUrl) //* update: pagination
        )
        .flat()

    return allMeta
}

const getAllMeta = async () =>
    await extractAllMeta(
        await extractAllPostFileName(await getAllCategoryName())
    )

const getLatestPostMeta = async (): Promise<MetaType[]> =>
    (await getAllMeta())
        .sort((prev, current) => sortByDate(prev.update, current.update))
        .slice(0, config.numberOfLatestPost)
        .map(updateMeta.postOrder)

const getSpecificCategoryMeta = async (
    categoryName: string
): Promise<MetaType[]> =>
    (await getAllMeta())
        .filter(({ category }) => category === categoryName)
        .map(updateMeta.postOrder)

const getSpecificCategoryLatestMeta = (
    specificCategoryMeta: MetaType[]
): MetaType[] => specificCategoryMeta.slice(0, config.numberOfLatestPost)

/**
 * @param category meta extraction category
 * @param pageNumber meta extraction page-number
 */
const getCategoryPaginationPostMeta = async ({
    category,
    page,
}: {
    category: string
    page: number
}): Promise<MetaType[]> =>
    await (
        await getSpecificCategoryMeta(category)
    ).slice(
        (page - 1) * config.postPerCategoryPage,
        page * config.postPerCategoryPage
    )
//* ----------------------------- 🔥 post 🔥 -----------------------------
const extractSinglePost = async ({
    category,
    fileName,
    dir,
}: {
    category: string
    fileName: string
    dir: string
}): Promise<{
    bundledSource: string
    meta: MetaType | void
    toc: PostTOCType[]
}> => {
    const postSource = await readFile(dir, "utf-8")
    if (!postSource)
        throw new BlogFileExtractionError({
            errorNameDescription: "post file extraction error occured",
            readingFileFormat: ".mdx",
            readingFileLocation: dir,
            readingFileName: fileName,
        })

    const {
        bundledResult: { code: bundledSource, frontmatter: extractedMeta },
        toc,
    } = await bundlePost<MDXMetaType>({
        postSource,
        customPlugin: config.useKatex
            ? definePlugins({
                  rehypePlugins: [
                      rehypePrism,
                      rehypeKatex,
                      rehypeInjectCodeClassName,
                      rehypeHeaderId,
                  ],
                  remarkPlugins: [remarkImageSizeByAlt, remarkGfm, remarkMath],
              })
            : definePlugins({
                  rehypePlugins: [
                      rehypePrism,
                      rehypeInjectCodeClassName,
                      rehypeHeaderId,
                  ],
                  remarkPlugins: [remarkImageSizeByAlt, remarkGfm],
              }),
    })

    const meta = generateMeta({
        extractedMeta,
        category,
        postFileName: fileName,
    })

    return {
        bundledSource,
        meta,
        toc,
    }
}
/**
 * @param allPostFileName {@link CategoryPostFileNameType}
 */
const extractAllPost = async (
    allPostFileName: CategoryPostFileNameType[]
): Promise<AllPostOfSpecificCategoryType[]> => {
    const allPost: AllPostOfSpecificCategoryType[] = await Promise.all(
        allPostFileName.map(async ({ category, allCategoryPostFileName }) => {
            const allCategoryPost: PostType[] = (
                await allCategoryPostFileName.reduce<Promise<PostType[]>>(
                    async (acc, postFileName) => {
                        const postDir = `${blogContentsDir}/${category}/${POST_FILE_NAME}/${postFileName}`

                        try {
                            const { bundledSource, meta, toc } =
                                await extractSinglePost({
                                    category,
                                    dir: postDir,
                                    fileName: postFileName,
                                })
                            if (meta)
                                return [
                                    ...(await acc),
                                    {
                                        meta,
                                        source: bundledSource,
                                        toc,
                                    },
                                ]

                            return await acc
                        } catch (err) {
                            throw new BlogErrorAdditionalInfo({
                                passedError: err,
                                errorNameDescription:
                                    "Might be post meta info 🔎 incorrections",
                                message:
                                    "Post Should include\n\n      🔒 All Value Common RULE: [ NOT empty string: '' ]\n\n      ✅ title   : Post's Title\n      ✅ preview : Post's Preview\n      ✅ author  : Post author name\n      ✅ update  : [ yyyy/mm/dd ]\n                 : [🚨WARNING: SHOULD FOLLOW FORMAT]\n      ✅ color   : Post main color, HEX | RGB | RGBA\n                 : [🚨WARNING: WRAP YOUR COLOR WITH colon or semi-colon]\n      ✅ tags    : tag1, tag2, tag3, ...\n                 : [🚨WARNING: DIVIDE TAG WITH comma ,]\n",
                                customeErrorMessage: `your post meta info at:\n\n   ${postDir}`,
                            })
                        }
                    },
                    Promise.resolve([] as PostType[])
                )
            )
                .sort(
                    (
                        { meta: { update: currDate } },
                        { meta: { update: nextDate } }
                    ) => sortByDate(currDate, nextDate)
                )
                .map(({ meta, source, toc }, order) => ({
                    meta: updateMeta.postUrl(meta, order), // update url for pagination
                    source,
                    toc,
                }))

            const categoryPost: AllPostOfSpecificCategoryType = {
                allCategoryPost,
                postCount: allCategoryPost.length,
                category,
            }
            return categoryPost
        })
    )

    return allPost
}

/**
 * - `controller` generates at this function
 * -  check **controller text** option at `config.postControllerText`
 * -  check {@link PostWithControllerType}
 */
const getSinglePost = async ({
    category,
    page,
    postTitle,
}: {
    category: string
    page: number
    postTitle: string
}): Promise<PostWithControllerType> => {
    const post = (await getAllPost())
        .find(
            ({ category: extractedCategory }) => category === extractedCategory
        )! //* It is definitely exsists, non-nullable
        .allCategoryPost.reduce<PostWithControllerType>(
            (post, currPost, idx, totPost) => {
                if (
                    currPost.meta.postUrl ===
                    `/${category}/${page}/${postTitle}`
                ) {
                    const isFirst = idx === 0
                    const isLast = idx === totPost.length - 1

                    const prevPost: PostControllerInfoType = isFirst
                        ? {
                              title: config.postControllerText.first(category),
                              link: `/${category}`,
                          }
                        : {
                              title: totPost[idx - 1].meta.title,
                              link: totPost[idx - 1].meta.postUrl,
                          }
                    const nextPost: PostControllerInfoType = isLast
                        ? {
                              title: config.postControllerText.last(category),
                              link: `/${category}`,
                          }
                        : {
                              title: totPost[idx + 1].meta.title,
                              link: totPost[idx + 1].meta.postUrl,
                          }

                    const postController: PostControllerType = {
                        prevPost,
                        nextPost,
                    }
                    const specificPostContent: PostWithControllerType = {
                        ...currPost,
                        controller: postController,
                    }
                    return specificPostContent
                }
                return post
            },
            {} as PostWithControllerType
        )
    return post
}

const getAllPost = async (): Promise<AllPostOfSpecificCategoryType[]> =>
    await extractAllPost(
        await extractAllPostFileName(await getAllCategoryName())
    )

//* ----------------------------- 🔥 path, getStaticPath 🔥 -----------------------------
const getAllPostPath = async () =>
    (await getAllMeta()).map(({ postUrl }) => postUrl)

const getAllPostPaginationPath = async () =>
    (
        await Promise.all(
            (
                await getAllCategoryName()
            ).map(async (category) => {
                const specificCategoryPaginationPath = Array.from(
                    {
                        length: await getTotalPageNumberOfCategory(category),
                    },
                    (_, i) => i + 1
                ).map((pageNumber) =>
                    addPathNotation(`${category}/${pageNumber}`)
                )
                return specificCategoryPaginationPath
            })
        )
    ).flat()
//* ----------------------------- 🔥 page number 🔥 -----------------------------
const getTotalPageNumberOfCategory = async (category: string) =>
    Math.ceil(
        (await (
            await readdir(
                `${blogContentsDir}/${category}/${POST_FILE_NAME}`,
                "utf-8"
            )
        ).length) / config.postPerCategoryPage
    )
//* ----------------------------- 🔥 series 🔥 -----------------------------
interface ExtractedSeriesMeta
    extends Pick<MetaType, "color" | "postUrl" | "title"> {
    series: SeriesMetaType
}
const extractAllSeriesMeta = (allMeta: MetaType[]): ExtractedSeriesMeta[][] => {
    const filterMetaBySeriesExsistance = allMeta.reduce<ExtractedSeriesMeta[]>(
        (acc, { series, color, title, postUrl }) => {
            if (series === null) return acc
            return [
                ...acc,
                {
                    series,
                    color,
                    title,
                    postUrl,
                },
            ]
        },
        []
    )
    const seriesTitle = [
        ...new Set(
            filterMetaBySeriesExsistance.map(
                ({ series: { seriesTitle } }) => seriesTitle
            )
        ),
    ]
    const seriesMeta: ExtractedSeriesMeta[][] = seriesTitle.map((title) =>
        filterMetaBySeriesExsistance
            .filter(({ series: { seriesTitle } }) => seriesTitle === title)
            .sort((a, b) => a.series.order - b.series.order)
    )

    return seriesMeta
}

const getAllSeries = (allMeta: MetaType[]): SeriesType[] => {
    const allSeriesMeta = extractAllSeriesMeta(allMeta)

    const allSeries = allSeriesMeta
        .map((categorySeriesMeta) =>
            categorySeriesMeta.reduce<SeriesInfoType[]>(
                (acc, curr, order, tot) => {
                    if (curr.series === null) return acc

                    const updatedSeries: SeriesInfoType = {
                        ...curr.series,
                        postTitle: curr.title,
                        color: curr.color,
                        url: curr.postUrl,
                        prevLink: tot[order - 1]?.postUrl ?? null,
                        nextLink: tot[order + 1]?.postUrl ?? null,
                    }
                    return [...acc, updatedSeries]
                },
                []
            )
        )
        .map((seriesInfo) =>
            seriesInfo.reduce<SeriesType>(
                (__, { seriesTitle }, _, seriesInfo) => ({
                    seriesTitle,
                    seriesInfo,
                }),
                {} as SeriesType
            )
        )
        .filter(({ seriesInfo }) => seriesInfo.length !== 1) // number of series is more than 2
        .sort(
            (
                { seriesTitle: firstSeriesTitle },
                { seriesTitle: secondSeriesTitle }
            ) => firstSeriesTitle.localeCompare(secondSeriesTitle, ["ko", "en"])
        )
    return allSeries
}

const getSingleSeries = async (
    postSeriesTitle: string,
    allMeta: MetaType[]
) => {
    const seriesInfo = (await getAllSeries(allMeta)).find(
        ({ seriesTitle }) => seriesTitle === postSeriesTitle
    )
    return seriesInfo ?? null
}

//* ----------------------------- 🔥 export 🔥 -----------------------------
export {
    //* bundleMDX
    bundlePost,
    //* post
    getSinglePost,
    //* meta
    getLatestPostMeta,
    getSpecificCategoryMeta,
    getSpecificCategoryLatestMeta,
    getCategoryPaginationPostMeta,
    //* series
    getAllSeries,
    getSingleSeries,
    //* getStaticPaths
    getAllPostPath,
    getAllPostPaginationPath,
    //* pagination
    getTotalPageNumberOfCategory,
    //* tag
    getUniqueTagFromMeta,
}
