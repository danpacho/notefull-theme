import { Metadata } from "next"
import { ColorTitle } from "~/components/common/atoms"
import { Banner, PostLinkLayer, SeriesViewer } from "~/components/common"
import { getSingleCategoryInfo } from "~/core/loader/category"
import {
    getAllSeries,
    getSpecificCategoryLatestMeta,
    getSpecificCategoryMeta,
} from "~/core/loader/post"

type CategoryPageParams = {
    params: {
        category: string
    }
}

export async function generateMetadata({
    params: { category },
}: CategoryPageParams): Promise<Metadata> {
    const { description } = await getSingleCategoryInfo(category)

    return {
        category,
        description,
    }
}

export default async function CategoryPage({
    params: { category },
}: CategoryPageParams) {
    const specificCategoryMeta = await getSpecificCategoryMeta(category)
    const latestCategoryPostMeta =
        getSpecificCategoryLatestMeta(specificCategoryMeta)

    const categorySeries = getAllSeries(specificCategoryMeta)

    const { color, description, emoji } = await getSingleCategoryInfo(category)

    const isSeriesExist = categorySeries.length !== 0
    const title = `${category} ${emoji}`

    return (
        <>
            <Banner title={title} description={description} hex={color} />

            {isSeriesExist && (
                <>
                    <ColorTitle
                        title="Series"
                        size="text-3xl"
                        hex={color}
                        href={categorySeries[0].seriesInfo[0].url}
                    />
                    <SeriesViewer
                        allSeriesInfo={categorySeries}
                        color={color}
                    />
                </>
            )}

            <ColorTitle
                title="Read More"
                size="text-3xl"
                hex={color}
                href={`/${category}/1`}
            />
            <PostLinkLayer
                displayAuthorInsteadCategory
                postMetaArray={latestCategoryPostMeta}
            />
        </>
    )
}
