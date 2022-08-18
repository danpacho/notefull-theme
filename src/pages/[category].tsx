import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page"
import { CategoryInfoType } from "@typing/category"
import { MetaType } from "@typing/post/meta"
import { SeriesType } from "@typing/post/series"

import {
    getAllCategoryPath,
    getSingleCategoryInfo,
} from "@core/loader/category"

import {
    getAllSeries,
    getSpecificCategoryMeta,
    getSpecificCategoryLatestMeta,
    getUniqueTagFromMeta,
} from "@core/loader/post"

import { config } from "blog.config"
import { CategorySEO } from "@components/SEO"

interface ParamQuery extends ParsedUrlQuery {
    category: string
}

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const specificCategoryMeta = await getSpecificCategoryMeta(category)
    const latestCategoryPostMeta =
        getSpecificCategoryLatestMeta(specificCategoryMeta)
    const categorySeries = getAllSeries(specificCategoryMeta)

    const latestTag = getUniqueTagFromMeta(latestCategoryPostMeta)

    const categoryInfo = await getSingleCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestPost: latestCategoryPostMeta,
            latestTag,
            allSeries: categorySeries,
            ...categoryInfo,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const allCategoryPath = await getAllCategoryPath()
    return {
        paths: allCategoryPath,
        fallback: false,
    }
}

interface CategoryPageProps extends CategoryInfoType {
    latestPost: MetaType[]
    latestTag: string[]
    allSeries: SeriesType[]
}
function CategoryPage(categoryProps: CategoryPageProps) {
    return (
        <>
            <CategorySEO {...categoryProps} />
        </>
    )
}
CategoryPage.displayName = "Category" as PageType
export default CategoryPage
