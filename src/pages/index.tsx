import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import type { PageType } from "@typing/page"
import type { MetaType } from "@typing/post/meta"
import type { CategoryInfoType } from "@typing/category"

import { getMainCategoryInfo } from "@core/loader/category"
import { getLatestPostMeta } from "@core/loader/post"

import { Banner, PostLinkLayer, CategoryLinkLayer } from "@components/_common"
import { Title } from "@components/_atoms"

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
            <Banner
                title={config.author.name}
                description={config.author.introduce}
                hex={config.themeColor}
            />

            <Title mdSize="md:text-3xl" size="text-2xl" styleClass="pt-6 pb-3">
                Category
            </Title>
            <CategoryLinkLayer
                categoryInfoArray={mainCategory}
                displayCategoryPageLinkBtn
            />

            <Title mdSize="md:text-3xl" size="text-2xl" styleClass="pt-6 pb-3">
                Latest
            </Title>
            <PostLinkLayer postMetaArray={latestPost} />
        </>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage
