import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page/type"
import { SeriesInfoType } from "@typing/post/series"
import { SpecificPostContentType } from "@typing/post/content"

import {
    getSpecificCategoryPost,
    getAllCategoryPostPath,
    getSpecificCategorySeriesInfo,
    getCategoryAllPostMeta,
} from "@core/loader/post"

import { PostSEO } from "@components/SEO"
import MDXBundler from "@components/MDXBundler"
import KatexStyleLoader from "@components/KatexStyleLoader"

import { config } from "blog.config"

interface ParamQuery extends ParsedUrlQuery {
    category: string
    pageNumber: string
    postTitle: string
}
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
    const { category, pageNumber, postTitle } = params as ParamQuery

    const { postController, postMeta, postSource, toc } =
        await getSpecificCategoryPost({
            categoryName: category,
            categoryPage: Number(pageNumber),
            postTitle,
        })

    const postSeriesInfo = postMeta.series
        ? await getSpecificCategorySeriesInfo(
              postMeta.series.seriesTitle,
              await getCategoryAllPostMeta(category)
          )
        : null

    return {
        props: {
            postController,
            postMeta,
            postSource,
            postSeriesInfo,
            toc,
        },
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllCategoryPostPath()
    return {
        paths,
        fallback: false,
    }
}
interface PostSeriesInfo {
    postSeriesInfo: SeriesInfoType | null
}
interface PostProps extends SpecificPostContentType, PostSeriesInfo {}
function Post({
    postController,
    postMeta,
    postSource,
    postSeriesInfo,
    toc,
}: PostProps) {
    return (
        <>
            <PostSEO {...postMeta} />

            <MDXBundler mdxSource={postSource} />

            {config.useKatex && <KatexStyleLoader />}
        </>
    )
}

Post.displayName = "Post" as PageType
export default Post
