import { GetStaticPaths, GetStaticProps } from "next"

import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { PostMetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category/info"

import {
    getSpecificPostMeta,
    getTagOfSpecificCategoryPage,
    getPageNumberOfCategory,
    getAllCategoryPaginationPath,
} from "@core/loader/post"

import { getSpecificCategoryInfo } from "@core/loader/category"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
    pageNumber: string
}

export const getStaticProps: GetStaticProps<CategoryPostPerPageProps> = async ({
    params,
}) => {
    const { category, pageNumber } = params as ParamQuery

    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    const specificPageCategoryPostMeta = await getSpecificPostMeta({
        category,
        pageNumber: Number(pageNumber),
    })

    const spcificPageCategoryPostTagArray = getTagOfSpecificCategoryPage(
        specificPageCategoryPostMeta
    )

    const endPageNumber = await getPageNumberOfCategory(category)

    return {
        props: {
            categoryPostArray: specificPageCategoryPostMeta,
            categoryTagArray: spcificPageCategoryPostTagArray,
            isLast: Number(pageNumber) === endPageNumber,
            pageNumber,
            ...specificCategoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const specificPagePostContentPath = await getAllCategoryPaginationPath()

    return {
        paths: specificPagePostContentPath,
        fallback: false,
    }
}

interface CategoryPostPerPageProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    pageNumber: string
    category: string
    isLast: boolean
}

function CategoryPostPerPage(props: CategoryPostPerPageProps) {
    return <></>
}
CategoryPostPerPage.displayName = "Category" as PageType

export default CategoryPostPerPage
