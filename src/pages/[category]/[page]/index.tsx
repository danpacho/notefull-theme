import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import type { PostControllerInfoType } from "@typing/post"
import type { CategoryInfoType } from "@typing/category"
import type { MetaType } from "@typing/post/meta"
import type { PageType } from "@typing/page"

import {
    getCategoryPaginationPostMeta,
    getTotalPageNumberOfCategory,
    getAllPostPaginationPath,
} from "@core/loader/post"

import { getSingleCategoryInfo } from "@core/loader/category"

import { Banner, PageLinkController, PostLinkLayer } from "@components/_common"
import { ColorTitle } from "@components/_atoms"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
    page: string
}

export const getStaticProps: GetStaticProps<
    PaginatedCategoryPageProps
> = async ({ params }) => {
    const { category, page } = params as ParamQuery
    const pageNumber = Number(page)
    const categoryInfo = await getSingleCategoryInfo(category)

    const paginatedPostMeta = await getCategoryPaginationPostMeta({
        category,
        page: pageNumber,
    })

    const endPageNumber = await getTotalPageNumberOfCategory(category)

    return {
        props: {
            allPost: paginatedPostMeta,
            page: pageNumber,
            isLastPage: pageNumber === endPageNumber,
            ...categoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const specificPagePostContentPath = await getAllPostPaginationPath()

    return {
        paths: specificPagePostContentPath,
        fallback: false,
    }
}

const getLinkInfo = (
    {
        category,
        categoryUrl,
        isLastPage,
        page,
    }: {
        category: string
        categoryUrl: string
        page: number
        isLastPage: boolean
    },
    type: "prev" | "next"
): PostControllerInfoType => {
    const isFirstPage = page === 1
    if (type === "prev") {
        return {
            title: isFirstPage
                ? config.postControllerText.first(category)
                : `Page ${page - 1}`,
            link: isFirstPage ? categoryUrl : `${categoryUrl}/${page - 1}`,
        }
    }
    return {
        title: isLastPage
            ? config.postControllerText.last(category)
            : `Page ${page + 1}`,
        link: isLastPage ? categoryUrl : `${categoryUrl}/${page + 1}`,
    }
}
interface PaginatedCategoryPageProps extends CategoryInfoType {
    allPost: MetaType[]
    page: number
    isLastPage: boolean
}
function PaginatedCategoryPage({
    allPost,
    category,
    categoryUrl,
    description,
    color,
    emoji,
    isLastPage,
    page,
}: PaginatedCategoryPageProps) {
    const title = `${category} ${emoji}`
    const linkInfo = {
        category,
        categoryUrl,
        page,
        isLastPage,
    }
    return (
        <>
            <div className="flex flex-col items-start justify-start w-full h-full min-h-screen gap-4">
                <Banner
                    title={title}
                    description={description}
                    href={categoryUrl}
                    hex={color}
                />
                <ColorTitle
                    title={`Page ${page}`}
                    hex={color}
                    size="text-3xl"
                    href={categoryUrl}
                />
                <PostLinkLayer
                    displayAuthorInsteadCategory
                    postMetaArray={allPost}
                />
            </div>
            <PageLinkController
                prev={getLinkInfo(linkInfo, "prev")}
                next={getLinkInfo(linkInfo, "next")}
            />
        </>
    )
}
PaginatedCategoryPage.displayName = "Category" as PageType

export default PaginatedCategoryPage
