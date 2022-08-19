import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { CategoryInfoType } from "@typing/category"
import { MetaType } from "@typing/post/meta"
import { SeriesType } from "@typing/post/series"
import { PageType } from "@typing/page"

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

import { CategorySEO } from "@components/SEO"

import { config } from "blog.config"

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

    const categoryInfo = await getSingleCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestPost: latestCategoryPostMeta,
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
    allSeries: SeriesType[]
}
function CategoryPage(props: CategoryPageProps) {
    const {
        latestPost,
        allSeries,
        category,
        categoryUrl,
        description,
        color,
        emoji,
    } = props
    const latestTag = getUniqueTagFromMeta(latestPost)

    return (
        <>
            <CategorySEO {...props} />
        </>
    )
}
CategoryPage.displayName = "Category" as PageType
export default CategoryPage
