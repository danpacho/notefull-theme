import { PropsWithChildren } from "react"
import { getTotalPageNumberOfCategory } from "~/core/loader/post"

export async function generateStaticParams({
    params: { category },
}: {
    params: {
        category: string
    }
}) {
    const categoryTotalPageNumber = await getTotalPageNumberOfCategory(category)
    const categoryPath = Array.from(
        { length: categoryTotalPageNumber },
        (_, i) => ({
            page: String(i + 1),
        })
    )
    return categoryPath
}

export default function PageLayout({ children }: PropsWithChildren) {
    return <>{children}</>
}
