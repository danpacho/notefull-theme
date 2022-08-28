import { GetStaticProps } from "next"
import { NextSeo } from "next-seo"

import { PageType } from "@typing/page"
import { MetaType } from "@typing/post/meta"
import { CategoryInfoType } from "@typing/category"

import { getMainCategoryInfo } from "@core/loader/category"
import { getLatestPostMeta } from "@core/loader/post"

import { config } from "blog.config"

import { PostLink, CategoryLink, Banner } from "@components/_common"
import { ColorTitle } from "@components/_atoms"

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
        <div className="flex flex-col items-start justify-center gap-4 p-8">
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

            <ColorTitle
                hex={config.themeColor}
                title="Category"
                size="text-2xl"
            />

            <div className="grid w-full grid-cols-2 grid-rows-2 gap-4 md:grid-cols-3 ">
                {mainCategory.map((category) => (
                    <CategoryLink {...category} key={category.category} />
                ))}
                <CategoryLink
                    category="Expore More"
                    categoryUrl="/category"
                    color="#ded235"
                    description="click to explore more category"
                    emoji="🍻"
                />
            </div>

            <ColorTitle
                hex={config.themeColor}
                title="Latest"
                size="text-2xl"
            />

            <div className="grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2">
                {latestPost.map((post) => (
                    <PostLink {...post} key={post.title} />
                ))}
            </div>
        </div>
    )
}
MainPage.displayName = "Home" as PageType

export default MainPage
