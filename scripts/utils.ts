import matter from "gray-matter"

import { readdir, readFile } from "fs/promises"

import { POST_FILE_NAME, MAC_OS_FILE_EXCEPTION } from "@constants/index"

import { MDXMetaType } from "@typing/post/meta"

import { blogContentsDir, removeFileFormat } from "@core/loader/util"

import { config } from "blog.config"

const sortByDate = (currDate: string, nextDate: string) => {
    const nextDateNumber = Number(nextDate.replace(/\//g, ""))
    const currDateNumber = Number(currDate.replace(/\//g, ""))

    if (currDateNumber < nextDateNumber) return 1
    if (currDateNumber > nextDateNumber) return -1
    return 0
}

const replaceSpaceToEncode = (text: string) => text.replace(/ /g, "%20")

const getAllCategoryPath = async () =>
    (await readdir(blogContentsDir, "utf-8"))
        .filter((category) => category !== MAC_OS_FILE_EXCEPTION)
        .map((category) => `/${category}`)

const getPostPaginationUrl = (category: string, order: number) =>
    `${replaceSpaceToEncode(category)}/${Math.floor(
        order / config.postPerCategoryPage + 1
    )}`
const getPostUrl = (postPaginationUrl: string, postFileName: string) =>
    `${postPaginationUrl}/${removeFileFormat(
        replaceSpaceToEncode(postFileName),
        "mdx"
    )}`

const extractAllCategoryPostFileName = async (categoryNameArray: string[]) => {
    const dirPostInfo = await Promise.all(
        categoryNameArray.map(async (categoryName) => {
            const postDir = `${blogContentsDir}/${categoryName}/${POST_FILE_NAME}`
            const categoryPostFileNameArray = (
                await readdir(postDir, "utf-8")
            ).filter((postFileName) => postFileName !== MAC_OS_FILE_EXCEPTION)
            return {
                category: categoryName,
                categoryPostFileNameArray,
            }
        })
    )
    return dirPostInfo
}

interface CategoryPostFileNameType {
    category: string
    categoryPostFileNameArray: string[]
}

export interface TempMetaType {
    category: string
    postFileName: string
    update: string
    title: string
    author: string
    tags: string[]
    preview: string
    paginationUrl: string
    postUrl: string
}
const extractMeta = async ({
    category,
    postFileName,
}: {
    category: string
    postFileName: string
}): Promise<TempMetaType | undefined> => {
    const postUrl = `${blogContentsDir}/${category}/${POST_FILE_NAME}/${postFileName}`
    const postSource = await readFile(postUrl, "utf-8")

    const extractedMeta = matter(postSource).data as MDXMetaType
    if (Boolean(extractedMeta.postpone)) return
    return {
        update: extractedMeta.update,
        category,
        postFileName,
        author: extractedMeta.author,
        preview: extractedMeta.preview,
        tags: extractedMeta.tags.split(","),
        title: extractedMeta.title,
        paginationUrl: "",
        postUrl: "",
    }
}

const extractAllMeta = async (
    categoryPostFileNameArray: CategoryPostFileNameType[]
): Promise<TempMetaType[]> =>
    (
        await Promise.all(
            categoryPostFileNameArray.map(
                ({ category, categoryPostFileNameArray }) =>
                    categoryPostFileNameArray.reduce<Promise<TempMetaType[]>>(
                        async (acc, postFileName) => {
                            const postMeta = await extractMeta({
                                category,
                                postFileName,
                            })

                            if (postMeta) return [...(await acc), postMeta]
                            return await acc
                        },
                        Promise.resolve([] as TempMetaType[])
                    )
            )
        )
    )
        .map((categoryMetaArray) =>
            categoryMetaArray
                .sort((prev, curr) => sortByDate(prev.update, curr.update))
                .map((tempMeta, order) => {
                    const { category, postFileName, update } = tempMeta
                    const paginationUrl = getPostPaginationUrl(category, order)
                    return {
                        ...tempMeta,
                        paginationUrl,
                        postUrl: getPostUrl(paginationUrl, postFileName),
                        update: update.replace(/\//g, "-"),
                    }
                })
        )
        .flat()

const getAllMeta = async (category: string[]) =>
    await extractAllMeta(await extractAllCategoryPostFileName(category))

export { getAllMeta, getAllCategoryPath, replaceSpaceToEncode }
