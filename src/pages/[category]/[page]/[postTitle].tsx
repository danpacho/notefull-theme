import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import type { PageType } from "@typing/page"
import type { SeriesType } from "@typing/post/series"
import type { PostWithControllerType } from "@typing/post"

import {
    getSpecificCategoryMeta,
    getSingleSeries,
    getSinglePost,
    getAllPostPath,
} from "@core/loader/post"

import { PostSEO } from "@components/SEO"
import KatexStyleLoader from "@components/KatexStyleLoader"
import MDXBundler from "@components/MDX/Bundler"

import { PageLinkController } from "@components/_common"
import { PostNav, PostBanner, PostMeta, PostToc } from "@components/_pages/post"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
    page: string
    postTitle: string
}
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
    params,
}) => {
    const { category, page, postTitle } = params as ParamQuery

    const { controller, meta, source, toc } = await getSinglePost({
        category: category,
        page: Number(page),
        postTitle,
    })

    const seriesInfo = meta.series
        ? await getSingleSeries(
              meta.series.seriesTitle,
              await getSpecificCategoryMeta(category)
          )
        : null

    return {
        props: {
            controller,
            meta,
            source,
            seriesInfo,
            toc,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostPath()
    return {
        paths,
        fallback: false,
    }
}

interface PostPageProps extends PostWithControllerType {
    seriesInfo: SeriesType | null
}
function PostPage({
    source,
    meta,
    controller,
    seriesInfo,
    toc,
}: PostPageProps) {
    const { reference } = meta

    return (
        <div
            className={`flex flex-col items-start justify-start gap-4 min-h-screen w-full`}
        >
            <PostSEO {...meta} />

            <PostBanner
                {...meta}
                seriesTitle={seriesInfo?.seriesTitle}
                seriesCount={seriesInfo?.seriesInfo.length}
                seriesInfoArray={seriesInfo?.seriesInfo}
            />
            <MDXBundler source={source} />

            {reference && <PostMeta hex={meta.color} metaArray={reference} />}

            <PageLinkController
                prev={controller.prevPost}
                next={controller.nextPost}
            />

            <PostNav category={meta.category} />
            <PostToc toc={toc} />

            {config.useKatex && <KatexStyleLoader />}
        </div>
    )
}

PostPage.displayName = "Post" as PageType
export default PostPage
