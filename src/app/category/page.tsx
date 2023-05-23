import { config } from "blog.config"
import { Banner, CategoryLinkLayout } from "~/components/common"
import { getAllCategoryInfo } from "~/core/loader/category"

export const metadata = {
    title: "category page",
    description: `All category of ${config.siteName}`,
}

export default async function AllCategoryPage() {
    const allCategoryInfo = await getAllCategoryInfo()

    return (
        <>
            <Banner
                title="Category"
                description="all category here!"
                hex={config.themeColor}
                containerStyleClass="mb-4"
            />

            <CategoryLinkLayout categoryInfoArray={allCategoryInfo} />
        </>
    )
}
