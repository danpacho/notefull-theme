import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { PageType } from "@typing/page"
import { MetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category"

import { getMainCategoryInfo } from "@core/loader/category"
import { getLatestPostMeta } from "@core/loader/post"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<MainPageProps> = async () => {
    const latestPostMeta = await getLatestPostMeta()
    const mainCategoryInfo = await getMainCategoryInfo()

    return {
        props: {
            latestPost: latestPostMeta,
            mainCategory: mainCategoryInfo,
        },
    }
}

interface MainPageProps {
    latestPost: MetaType[]
    mainCategory: CategoryInfoType[]
}
function MainPage({ latestPost, mainCategory }: MainPageProps) {
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
