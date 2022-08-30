import { CategoryInfoType } from "@typing/category"

import { Grid } from "@components/_atoms"
import CategoryLink from "./CategoryLink"

interface CategoryLinkLayerProps {
    categoryInfoArray: CategoryInfoType[]
}
function CategoryLinkLayer({ categoryInfoArray }: CategoryLinkLayerProps) {
    return (
        <Grid
            row="grid-rows-2"
            col="grid-cols-2"
            gap="gap-4"
            mdCol="md:grid-cols-3"
        >
            {categoryInfoArray.map((categoryInfo) => (
                <CategoryLink {...categoryInfo} key={categoryInfo.category} />
            ))}
            <CategoryLink
                category="Expore More"
                categoryUrl="/category"
                color="#ded235"
                description="click to explore more category"
                emoji="🍻"
            />
        </Grid>
    )
}

export default CategoryLinkLayer
