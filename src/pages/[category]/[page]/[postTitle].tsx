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
import MDXBundler from "@components/MDXBundler"

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
    return (
        <>
            <PostSEO {...meta} />

            <MDXBundler source={source} />

            {config.useKatex && <KatexStyleLoader />}
        </>
    )
}

PostPage.displayName = "Post" as PageType
export default PostPage
