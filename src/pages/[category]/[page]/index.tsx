import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page"
import { MetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category"

import {
    getCategoryPaginationPostMeta,
    getTotalPageNumberOfCategory,
    getAllPostPaginationPath,
    getUniqueTagFromMeta,
} from "@core/loader/post"

import { getSingleCategoryInfo } from "@core/loader/category"

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
    const categoryInfo = await getSingleCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

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

interface PaginatedCategoryPageProps extends CategoryInfoType {
    allPost: MetaType[]
    page: number
    isLastPage: boolean
}
function PaginatedCategoryPage(props: PaginatedCategoryPageProps) {
    const {
        allPost,
        category,
        categoryUrl,
        description,
        color,
        emoji,
        isLastPage,
        page,
    } = props
    const allTag = getUniqueTagFromMeta(allPost)

    return <></>
}
PaginatedCategoryPage.displayName = "Category" as PageType

export default PaginatedCategoryPage
