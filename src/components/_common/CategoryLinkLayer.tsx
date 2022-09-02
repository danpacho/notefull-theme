import { CategoryInfoType } from "@typing/category"

import { Grid } from "@components/_atoms"
import CategoryLink from "./CategoryLink"

interface CategoryLinkLayerProps {
    categoryInfoArray: CategoryInfoType[]
    displayCategoryPageLinkBtn?: boolean
}
function CategoryLinkLayer({
    categoryInfoArray,
    displayCategoryPageLinkBtn = false,
}: CategoryLinkLayerProps) {
    return (
        <Grid col="grid-cols-2" gap="gap-4" mdCol="md:grid-cols-3">
            {categoryInfoArray.map((categoryInfo) => (
                <CategoryLink {...categoryInfo} key={categoryInfo.category} />
            ))}
            {displayCategoryPageLinkBtn && (
                <CategoryLink
                    category="Expore More"
                    categoryUrl="/category"
                    color="#ded235"
                    description="click to explore more category"
                    emoji="🍻"
                />
            )}
        </Grid>
    )
}

export default CategoryLinkLayer
