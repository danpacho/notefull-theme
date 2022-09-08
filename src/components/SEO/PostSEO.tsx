import { ArticleJsonLd, NextSeo } from "next-seo"

import { MetaType } from "@typing/post/meta"

import { config } from "blog.config"

function PostSEO({
    author,
    postUrl,
    update,
    preview,
    tags,
    title,
    bannerUrl,
}: MetaType) {
    const publishedTime = new Date(update).toISOString()
    const fullPostUrl = `${config.url}${postUrl}`
    return (
        <>
            <NextSeo
                title={title}
                description={preview}
                canonical={fullPostUrl}
                openGraph={{
                    title,
                    type: "article",
                    article: {
                        publishedTime,
                        authors: [config.author.name, author],
                        tags,
                    },
                    url: fullPostUrl,
                    description: preview,
                    site_name: config.siteName,
                    locale: config.language,
                    images: [
                        {
                            url: bannerUrl ?? config.author.bannerImageUrl,
                            alt: bannerUrl
                                ? `banner of ${title}`
                                : `welcome to ${config.siteName}!`,
                        },
                    ],
                }}
            />
            <ArticleJsonLd
                type="Blog"
                url={fullPostUrl}
                title={title}
                description={preview}
                authorName={config.author.name}
                publisherName={author}
                datePublished={publishedTime}
                images={[config.author.bannerImageUrl]}
            />
        </>
    )
}

export { PostSEO }
