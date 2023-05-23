import {
    getSpecificCategoryMeta,
    getSingleSeries,
    getSinglePost,
    getAllPostPath,
} from "~/core/loader/post"

import { MDXBundler } from "~/components/mdx/bundler"

import { PageLinkController } from "~/components/common"
import {
    PostNav,
    PostBanner,
    PostMeta,
    PostToc,
    KatexStyleLoader,
} from "./components"

import { config } from "blog.config"
import { Metadata } from "next"

type PostParams = {
    params: {
        category: string
        page: string
        postTitle: string
    }
}

export async function generateMetadata({
    params: { category, postTitle, page },
}: PostParams): Promise<Metadata> {
    const title = `${config.siteName}-${postTitle}`
    const description = `${postTitle} of ${category} page`
    return {
        title,
        description,
        category,
        openGraph: {
            url: `${config.url}/${category}/${page}/${postTitle}`,
            title,
            description,
            type: "article",
            siteName: config.siteName,
        },
    }
}

export async function generateStaticParams() {
    const fullPostPathName = await getAllPostPath()
    const blogStaticPath = fullPostPathName.map((postPath) => {
        const [category, page, postTitle] = postPath.split("/").filter(Boolean)
        return {
            category,
            page,
            postTitle,
        }
    })

    return blogStaticPath
}

export default async function PostPage({
    params: { category, postTitle, page },
}: PostParams) {
    const { controller, meta, source, toc } = await getSinglePost({
        category: category,
        page: Number(page),
        postTitle,
    })

    const seriesInfo = meta?.series
        ? await getSingleSeries(
              meta.series.seriesTitle,
              await getSpecificCategoryMeta(category)
          )
        : null

    return (
        <div
            className={`flex flex-col items-start justify-start gap-4 min-h-screen w-full`}
        >
            <PostBanner
                {...meta}
                seriesTitle={seriesInfo?.seriesTitle}
                seriesCount={seriesInfo?.seriesInfo.length}
                seriesInfoArray={seriesInfo?.seriesInfo}
            />

            <MDXBundler source={source} />

            {meta?.reference && (
                <PostMeta hex={meta.color} metaArray={meta.reference} />
            )}

            <PageLinkController
                prev={controller.prevPost}
                next={controller.nextPost}
            />

            <PostNav category={category} />
            <PostToc toc={toc} />

            {config.useKatex && <KatexStyleLoader />}
        </div>
    )
}
