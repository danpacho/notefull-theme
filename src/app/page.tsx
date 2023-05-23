import { getMainCategoryInfo } from "~/core/loader/category"
import { getLatestPostMeta } from "~/core/loader/post"

import { Banner, PostLinkLayer, CategoryLinkLayout } from "~/components/common"
import { Title } from "~/components/common/atoms"

import { config } from "blog.config"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: config.siteName,
    description: config.subtitle,
}

export default async function MainPage() {
    const latestPostMeta = await getLatestPostMeta()
    const mainCategoryInfo = await getMainCategoryInfo()

    return (
        <>
            <Banner
                title={config.author.name}
                description={config.author.introduce}
                hex={config.themeColor}
            />

            <Title mdSize="md:text-3xl" size="text-2xl" styleClass="pt-6 pb-3">
                Category
            </Title>
            <CategoryLinkLayout
                categoryInfoArray={mainCategoryInfo}
                displayCategoryPageLinkBtn
            />

            <Title mdSize="md:text-3xl" size="text-2xl" styleClass="pt-6 pb-3">
                Latest
            </Title>
            <PostLinkLayer postMetaArray={latestPostMeta} />
        </>
    )
}
