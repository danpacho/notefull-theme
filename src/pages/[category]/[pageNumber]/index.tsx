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
    pageNumber: string
}

export const getStaticProps: GetStaticProps<
    PaginatedCategoryPageProps
> = async ({ params }) => {
    const { category, pageNumber } = params as ParamQuery

    const categoryInfo = await getSingleCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    const paginatedPostMeta = await getCategoryPaginationPostMeta({
        category,
        pageNumber: Number(pageNumber),
    })

    const categoryTag = getUniqueTagFromMeta(paginatedPostMeta)

    const endPageNumber = await getTotalPageNumberOfCategory(category)

    return {
        props: {
            allPost: paginatedPostMeta,
            allTag: categoryTag,
            pageNumber,
            isLastPage: Number(pageNumber) === endPageNumber,
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
    allTag: string[]
    pageNumber: string
    isLastPage: boolean
}
function PaginatedCategoryPage(props: PaginatedCategoryPageProps) {
    return <></>
}
PaginatedCategoryPage.displayName = "Category" as PageType

export default PaginatedCategoryPage
