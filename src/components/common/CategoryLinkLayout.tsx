"use client"

import { CategoryInfoType } from "src/interface/category"

import { Grid } from "~/components/common/atoms"
import { CategoryLink } from "./CategoryLink"

interface CategoryLinkLayerProps {
    categoryInfoArray: CategoryInfoType[]
    displayCategoryPageLinkBtn?: boolean
}
export const CategoryLinkLayout = ({
    categoryInfoArray,
    displayCategoryPageLinkBtn = false,
}: CategoryLinkLayerProps) => {
    return (
        <Grid col="grid-cols-2" gap="gap-4" mdCol="md:grid-cols-3">
            {categoryInfoArray.map((categoryInfo) => (
                <CategoryLink {...categoryInfo} key={categoryInfo.category} />
            ))}
            {displayCategoryPageLinkBtn && (
                <CategoryLink
                    category="Explore More"
                    categoryUrl="/category"
                    color="#ded235"
                    description="click to explore more category"
                    emoji="🍻"
                />
            )}
        </Grid>
    )
}
