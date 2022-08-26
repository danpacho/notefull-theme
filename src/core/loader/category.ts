import { readdir, readFile } from "fs/promises"

import { CategoryInfoType } from "@typing/category"

import {
    DESCRIPTION_FILE_NAME,
    FILE_FORMAT,
    MAC_OS_FILE_EXCEPTION,
} from "@constants/index"

import {
    blogContentsDir,
    addPathNotation,
    getValidateColor,
} from "@core/loader/util"

import { BlogErrorAdditionalInfo, BlogPropertyError } from "@core/error"

import { config } from "blog.config"

//* ----------------------------- 🔥 extract categoru name 🔥 -----------------------------
const getAllCategoryName = async () => {
    try {
        return (await readdir(blogContentsDir, "utf-8"))
            .filter((category) => category !== MAC_OS_FILE_EXCEPTION)
            .map((category) => category.trim())
    } catch (err) {
        throw new BlogErrorAdditionalInfo({
            passedError: err,
            errorNameDescription:
                "blog-contents directory name 📝 incorrection",
            message: `Check ${config.blogContentsDirectoryName} and "${config.blogContentsDirectoryName}/contens" file name 🔎`,
            customeErrorMessage: `directory structure should match with following path ⬇️\n\n      ${blogContentsDir}\n\n      🔒 Check Post Directory Structure:\n 
            🏠 ${config.blogContentsDirectoryName}
            ┣ 📦 "content"
            ┃ ┣ 🗂 {catgory}
            ┃ ┃ ┃
            ┃ ┃ ┣ 🗂 "posts"
            ┃ ┃ ┃ ┣ 📔 {post}.mdx
            ┃ ┃ ┃ ┗...
            ┃ ┃ ┃
            ┃ ┃ ┗ 📔 "description.json"
            ┃ ┃
            ┣ ┗ 🗂 {catgory2}...
            ┃
            ┗ 📔 "profile.mdx"
            `,
        })
    }
}
//* ----------------------------- 🔥 path, getStaticPath 🔥 -----------------------------
/**
 * add path notaition to category names
 * @returns `/{category}`
 */
const getAllCategoryPath = async (): Promise<string[]> => {
    const categoryPathArray: string[] = (await getAllCategoryName()).map(
        (path) => addPathNotation(path)
    )
    return categoryPathArray
}
//* ----------------------------- 🔥 category info 🔥 -----------------------------
interface ExtractedCategoryInfoType {
    description: string
    color: string
    emoji: string
}
const EMOJI_REGEX = /\p{Emoji}/u

const readAllCategoryJSONFile = async (
    allCategoryName: string[]
): Promise<CategoryInfoType[]> => {
    const categoryInfoArray = await Promise.all(
        allCategoryName.map(async (category) => {
            const descriptionFilePath = `${blogContentsDir}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.JSON}`
            try {
                const { description, color, emoji } = JSON.parse(
                    await readFile(descriptionFilePath, "utf-8")
                ) as ExtractedCategoryInfoType

                const isDescriptionError =
                    description === undefined || description === ""
                const emojiExec = EMOJI_REGEX.exec(emoji)
                const isEmojiNotExists = emojiExec === null

                if (isDescriptionError)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [description]",
                        propertyName: "description",
                        propertyType: "string",
                        propertyDescription: description,
                        customeErrorMessage: `Track file's description🔎: \n      ${descriptionFilePath}`,
                    })

                if (isEmojiNotExists)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [emoji]",
                        propertyName: "emoji",
                        propertyType: "string",
                        customeErrorMessage: `Track file's description🔎: \n      ${descriptionFilePath}`,
                    })

                const categoryInfo = {
                    description,
                    color: getValidateColor(color),
                    emoji,
                    category,
                    categoryUrl: `/${category}`,
                }
                return categoryInfo
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription: "description.json file problem",
                    message:
                        "1. description file name incorrection \n      2. [.json] file syntax error\n",
                    customeErrorMessage: `"description.json" in your [${category}] File at\n\n      ${descriptionFilePath}\n\n      🔒 Check description.json format example:\n
                    {
                        "description": "my category description!",
                        "emoji": "🏠",
                        "color": "#1F2937"
                    }\n`,
                })
            }
        })
    )

    return categoryInfoArray
}

/**
 * used on `.json` format
 * @returns `category`: category name
 * @returns `description`: category description
 * @returns `categoryUrl`: category link
 * @returns `color`: category color
 * @returns `emoji`: category emoji
 */
const getAllCategoryInfo = async () =>
    await readAllCategoryJSONFile(await getAllCategoryName())

/**
 * set number of main category in `blog.config` at `config.numberOfMainPageCategory`
 */
const getMainCategoryInfo = async () =>
    (await getAllCategoryInfo())
        .sort()
        .slice(0, config.numberOfMainPageCategory)

/**
 * @returns `category`: category name
 * @returns `description`: category description
 * @returns `categoryUrl`: category link
 * @returns `color`: category color
 * @returns `emoji`: category emoji
 */
const getSingleCategoryInfo = async (
    category: string
): Promise<CategoryInfoType> => {
    const allCategoryInfo = await getAllCategoryInfo()
    const specificCategoryInfo = allCategoryInfo.find(
        ({ category: categoryName }) => categoryName === category
    )!

    return {
        ...specificCategoryInfo,
    }
}
//* ----------------------------- 🔥 export 🔥 -----------------------------
export {
    //* name
    getAllCategoryName,
    //* info
    getAllCategoryInfo,
    getMainCategoryInfo,
    getSingleCategoryInfo,
    //* getStaticPath
    getAllCategoryPath,
}
