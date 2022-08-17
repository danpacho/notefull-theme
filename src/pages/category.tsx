import { GetStaticProps } from "next"

import { PageType } from "@typing/page/type"
import { CategoryInfoType } from "@typing/category/info"

import { getAllCategoryInfo } from "@core/loader/category"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<CategoryProps> = async () => {
    const allCategoryInfo = await getAllCategoryInfo({
        useTXT: config.useTXT,
    })
    return {
        props: {
            allCategory: allCategoryInfo,
        },
    }
}

interface CategoryProps {
    allCategory: CategoryInfoType[]
}
function Category({ allCategory }: CategoryProps) {
    return <></>
}
Category.displayName = "Category" as PageType
export default Category
