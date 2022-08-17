import { GetStaticProps } from "next"

import { PageType } from "@typing/page/type"
import { CategoryInfoType } from "@typing/category"

import { getAllCategoryInfo } from "@core/loader/category"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<CategoryProps> = async () => {
    const allCategoryInfo = await getAllCategoryInfo({
        useTXT: config.useTXT,
    })
    return {
        props: {
            allCategoryInfo,
        },
    }
}

interface CategoryProps {
    allCategoryInfo: CategoryInfoType[]
}
function Category({ allCategoryInfo }: CategoryProps) {
    return <></>
}
Category.displayName = "Category" as PageType
export default Category
