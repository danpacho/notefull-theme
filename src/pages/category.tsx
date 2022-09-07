import { GetStaticProps } from "next"

import type { CategoryInfoType } from "@typing/category"
import type { PageType } from "@typing/page"

import { getAllCategoryInfo } from "@core/loader/category"

import { Banner, CategoryLinkLayer } from "@components/_common"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<
    AllCategoryPageProps
> = async () => {
    const allCategoryInfo = await getAllCategoryInfo()
    return {
        props: {
            allCategoryInfo,
        },
    }
}

interface AllCategoryPageProps {
    allCategoryInfo: CategoryInfoType[]
}
function AllCategoryPage({ allCategoryInfo }: AllCategoryPageProps) {
    return (
        <>
            <Banner
                title="Category"
                description="all category here!"
                hex={config.themeColor}
                containerStyleClass="mb-4"
            />

            <CategoryLinkLayer categoryInfoArray={allCategoryInfo} />
        </>
    )
}
AllCategoryPage.displayName = "Category" as PageType
export default AllCategoryPage
