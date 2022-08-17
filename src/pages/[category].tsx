import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"
import { SeriesInfoType } from "@typing/post/series"

import {
    getAllCategoryPath,
    getLatestCategoryTagArray,
    getSpecificCategoryInfo,
} from "@core/loader/category"

import {
    getCategorySeriesInfo,
    getCategoryLatestPostMeta,
    getCategoryAllPostMeta,
} from "@core/loader/post"

import { config } from "blog.config"
import { CategorySEO } from "@components/SEO"

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const categoryPostMeta = await getCategoryAllPostMeta(category)

    const specificCategoryInfo = await getSpecificCategoryInfo({
        category,
        useTXT: config.useTXT,
    })
    const latestCategoryPostArray = getCategoryLatestPostMeta(categoryPostMeta)
    const latestCategoryTagArray = getLatestCategoryTagArray(
        latestCategoryPostArray
    )
    const categorySeriesInfoArray = getCategorySeriesInfo(categoryPostMeta)

    return {
        props: {
            categoryPostArray: latestCategoryPostArray,
            categoryTagArray: latestCategoryTagArray,
            categorySeriesInfoArray,
            ...specificCategoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const categoryPaths = await getAllCategoryPath()
    return {
        paths: categoryPaths,
        fallback: false,
    }
}

interface CategoryProps extends CategoryInfoType {
    categoryPostArray: PostMetaType[]
    categoryTagArray: string[]
    categorySeriesInfoArray: SeriesInfoType[]
}

function Category(categoryProps: CategoryProps) {
    return (
        <>
            <CategorySEO {...categoryProps} />
        </>
    )
}
Category.displayName = "Category" as PageType
export default Category
