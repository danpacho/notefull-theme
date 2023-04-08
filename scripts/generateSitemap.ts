import { config } from "blog.config"
import { writeFile } from "fs/promises"
import { replaceSpaceToEncode, TempMetaType } from "./utils"

const URL_PRIORITY = {
    post: 0.8,
    category: 0.4,
    categoryPagination: 0.2,
}

async function generateSitemap(
    allCategoryPath: string[],
    allPostMeta: TempMetaType[]
) {
    const addSiteUrlNotation = (relativePath: string) =>
        `${config.url}${relativePath}`

    const generateUrlSet = (
        url: string,
        option: {
            changeFrequency?:
                | "always"
                | "hourly"
                | "daily"
                | "weekly"
                | "monthly"
                | "yearly"
                | "never"
            priority?: number
            lastModified?: string
        }
    ) =>
        `<url><loc>${url}</loc>${
            option?.priority && `<priority>${option.priority}</priority>`
        }${
            option?.changeFrequency &&
            `<changefreq>${option.changeFrequency}</changefreq>`
        }${
            typeof option?.lastModified === "string"
                ? `<lastmod>${option.lastModified}</lastmod>`
                : ""
        }</url>`

    const modifiedAllCategoryPath = allCategoryPath
        .map(addSiteUrlNotation)
        .map(replaceSpaceToEncode)

    const allCategoryUrlSet = modifiedAllCategoryPath.map((categoryPath) =>
        generateUrlSet(categoryPath, {
            changeFrequency: "monthly",
            priority: URL_PRIORITY.category,
        })
    )
    const allCategoryPaginationPath = allPostMeta
        .map(({ paginationUrl }) => paginationUrl)
        .map(addSiteUrlNotation)

    const allCategoryPaginationUrlSet = allCategoryPaginationPath.map(
        (postPath) =>
            generateUrlSet(postPath, {
                changeFrequency: "daily",
                priority: URL_PRIORITY.categoryPagination,
            })
    )
    const allPostUrlSet = allPostMeta.map(({ postUrl, update }) =>
        generateUrlSet(addSiteUrlNotation(postUrl), {
            changeFrequency: "daily",
            priority: URL_PRIORITY.post,
            lastModified: update,
        })
    )

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

<url><loc>${config.url}</loc></url>
<url><loc>${config.url}/category</loc></url>
<url><loc>${config.url}/profile</loc></url>

${allCategoryUrlSet.join("\n")}
${allCategoryPaginationUrlSet.join("\n")}
${allPostUrlSet.join("\n")}
</urlset>`

    await writeFile("public/sitemap.xml", sitemap, {
        encoding: "utf-8",
    })
}

export { generateSitemap }
