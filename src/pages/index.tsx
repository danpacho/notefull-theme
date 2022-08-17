import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { CategoryInfoType } from "@typing/category/info"
import { PostMetaType } from "@typing/post/meta"
import { PageType } from "@typing/page/type"

import { getLatestCategoryInfo } from "@core/loader/category"
import { getLatestPostMeta } from "@core/loader/post"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const latestPostMetaArray = await getLatestPostMeta()
    const latestCategoryInfoArray = await getLatestCategoryInfo({
        useTXT: config.useTXT,
    })

    return {
        props: {
            latestPostArray: latestPostMetaArray,
            categoryInfoArray: latestCategoryInfoArray,
        },
    }
}

interface MainPageProps {
    latestPostArray: PostMetaType[]
    categoryInfoArray: CategoryInfoType[]
}

function MainPage({ latestPostArray, categoryInfoArray }: MainPageProps) {
    return (
        <>
            <NextSeo
                title={config.siteName}
                canonical={config.url}
                description={config.subtitle}
            />
        </>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage
