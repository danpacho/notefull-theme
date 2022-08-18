import { GetStaticPaths, GetStaticProps } from "next"
import { ParsedUrlQuery } from "querystring"

import { PageType } from "@typing/page"
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
export const getStaticProps: GetStaticProps<PostPageProps> = async ({
    params,
}) => {
    const { category, pageNumber, postTitle } = params as ParamQuery

    const { controller, meta, source, toc } = await getSinglePost({
        categoryName: category,
        categoryPage: Number(pageNumber),
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
