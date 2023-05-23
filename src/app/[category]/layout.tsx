import { PropsWithChildren } from "react"
import { getAllCategoryName } from "~/core/loader/category"

export async function generateStaticParams() {
    const allCategory = await getAllCategoryName()
    const allCategoryPath = allCategory.map((category) => ({
        category,
    }))
    return allCategoryPath
}

export default function CategoryLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
