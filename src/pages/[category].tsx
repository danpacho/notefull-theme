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

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
    params,
}) => {
    const { category } = params as ParamQuery

    const specificCategoryMeta = await getSpecificCategoryMeta(category)
    const latestCategoryPostMeta =
        getSpecificCategoryLatestMeta(specificCategoryMeta)
    const categorySeries = getAllSeries(specificCategoryMeta)

    const latestCategoryTag = getUniqueTagFromMeta(latestCategoryPostMeta)

    const categoryInfo = await getSingleCategoryInfo({
        category,
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestCategoryPostMeta,
            latestCategoryTag,
            categorySeries,
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

interface CategoryProps extends CategoryInfoType {
    latestCategoryPostMeta: MetaType[]
    latestCategoryTag: string[]
    categorySeries: SeriesType[]
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
