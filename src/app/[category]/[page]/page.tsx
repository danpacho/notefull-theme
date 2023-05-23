import {
    getCategoryPaginationPostMeta,
    getTotalPageNumberOfCategory,
} from "~/core/loader/post"

import { getSingleCategoryInfo } from "~/core/loader/category"

import { Banner, PageLinkController, PostLinkLayer } from "~/components/common"
import { ColorTitle } from "~/components/common/atoms"
import { Metadata } from "next"
import { config } from "blog.config"
import { PostControllerInfoType } from "~/interface/post"

type LinkInfo = {
    category: string
    categoryUrl: string
    page: number
    isLastPage: boolean
}
const getLinkInfo = (
    { category, categoryUrl, isLastPage, page }: LinkInfo,
    type: "prev" | "next"
): PostControllerInfoType => {
    const isFirstPage = page === 1
    if (type === "prev") {
        return {
            title: isFirstPage
                ? config.postControllerText.first(category)
                : `Page ${page - 1}`,
            link: isFirstPage ? categoryUrl : `${categoryUrl}/${page - 1}`,
        }
    }
    return {
        title: isLastPage
            ? config.postControllerText.last(category)
            : `Page ${page + 1}`,
        link: isLastPage ? categoryUrl : `${categoryUrl}/${page + 1}`,
    }
}

type CategoryParams = {
    params: {
        category: string
        page: string
    }
}

export async function generateMetadata({
    params: { category },
}: CategoryParams): Promise<Metadata> {
    const { categoryUrl, description } = await getSingleCategoryInfo(category)

    return {
        title: `${config.siteName} ${category}`,
        description: `${category} page`,
        category: category,
        openGraph: {
            url: categoryUrl,
            title: category,
            description,
        },
    }
}

export default async function PaginatedCategoryPage({
    params: { category, page },
}: CategoryParams) {
    const { categoryUrl, color, description, emoji } =
        await getSingleCategoryInfo(category)
    const title = `${category} ${emoji}`
    const pageNumber = Number(page)
    const postMetaArray = await getCategoryPaginationPostMeta({
        category,
        page: pageNumber,
    })

    const endPageNumber = await getTotalPageNumberOfCategory(category)
    const isLastPage = pageNumber === endPageNumber

    const linkInfo: LinkInfo = {
        page: pageNumber,
        isLastPage,
        category,
        categoryUrl,
    }

    return (
        <>
            <div className="flex flex-col items-start justify-start w-full h-full min-h-screen gap-4">
                <Banner
                    title={title}
                    description={description}
                    href={categoryUrl}
                    hex={color}
                />
                <ColorTitle
                    title={`Page ${page}`}
                    hex={color}
                    size="text-3xl"
                    href={categoryUrl}
                />
                <PostLinkLayer
                    displayAuthorInsteadCategory
                    postMetaArray={postMetaArray}
                />
            </div>

            <PageLinkController
                prev={getLinkInfo(linkInfo, "prev")}
                next={getLinkInfo(linkInfo, "next")}
            />
        </>
    )
}
