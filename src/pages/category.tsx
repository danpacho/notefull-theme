import { GetStaticProps } from "next"

import type { CategoryInfoType } from "@typing/category"
import type { PageType } from "@typing/page"

import { getAllCategoryInfo } from "@core/loader/category"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<
    AllCategoryPageProps
> = async () => {
    const allCategoryInfo = await getAllCategoryInfo({
        useTXT: config.useTXT,
    })
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
    return <></>
}
AllCategoryPage.displayName = "Category" as PageType
export default AllCategoryPage
