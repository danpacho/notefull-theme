import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
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

export const getStaticProps: GetStaticProps<CategoryPostPerPageProps> = async ({
    params,
}) => {
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
            paginatedPostMeta,
            paginatedTag: categoryTag,
            pageNumber,
            isLast: Number(pageNumber) === endPageNumber,
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

interface CategoryPostPerPageProps extends CategoryInfoType {
    category: string
    pageNumber: string
    paginatedTag: string[]
    paginatedPostMeta: MetaType[]
    isLast: boolean
}

function PaginatedPostPage(props: CategoryPostPerPageProps) {
    return <></>
}
PaginatedPostPage.displayName = "Category" as PageType

export default PaginatedPostPage
