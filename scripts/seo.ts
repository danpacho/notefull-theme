import { generateRSS } from "./generateRSS"
import { generateSitemap } from "./generateSitemap"
import { getAllCategoryPath, getAllMeta } from "./utils"

async function seo() {
    const allCategoryPath = await getAllCategoryPath()
    const allMeta = await getAllMeta(allCategoryPath)

    await generateSitemap(allCategoryPath, allMeta)
    await generateRSS(allMeta)
}

seo()
