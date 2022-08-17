import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { SeriesType } from "@typing/post/series"
import { PostWithControllerType } from "@typing/post"

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
    pageNumber: string
    postTitle: string
}
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const { category, pageNumber, postTitle } = params as ParamQuery

    const { controller, meta, source, toc } = await getSinglePost({
        categoryName: category,
        categoryPage: Number(pageNumber),
        postTitle,
    })

    const postSeriesInfo = meta.series
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
            postSeriesInfo,
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
interface PostSeriesInfo {
    postSeriesInfo: SeriesType | null
}
interface PostProps extends PostWithControllerType, PostSeriesInfo {}
function Post({ controller, meta, source, postSeriesInfo, toc }: PostProps) {
    return (
        <>
            <PostSEO {...meta} />

            <MDXBundler source={source} />

            {config.useKatex && <KatexStyleLoader />}
        </>
    )
}

Post.displayName = "Post" as PageType
export default Post
