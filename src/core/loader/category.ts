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

import {
    BlogErrorAdditionalInfo,
    BlogFileExtractionError,
    BlogPropertyError,
} from "@core/error"

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
            📦"${config.blogContentsDirectoryName}"
            ┃
            ┗ 📂"content"                                      blog content
            ┃ ┃
            ┃ ┗ 📂[catgory-name]                               your category name
            ┃ ┃ ┃
            ┃ ┃ ┣ 📂"posts"                                   category's posts
            ┃ ┃ ┃ ┣ 📜[post-name].mdx                         format: "mdx"
            ┃ ┃ ┃ ┗ ... more posts
            ┃ ┃ ┃
            ┃ ┃ ┗ 📜"description.json"                        your category's description
            ┃ ┃
            ┃ ┗ 📂[catgory-name2]...
            `,
        })
    }
}
//* ----------------------------- 🔥 path, getStaticPath 🔥 -----------------------------
/**
 * add URL notaition to category names
 * @returns `/{category}`
 */
const getAllCategoryPath = async (): Promise<string[]> => {
    const categoryPathArray: string[] = (await getAllCategoryName()).map(
        (path) => addPathNotation(path)
    )
    return categoryPathArray
}
//* ----------------------------- 🔥 category info - TXT 🔥 -----------------------------
/**
 * Read category `description.txt` files
 */
const readAllCategoryTXTFile = async (pureCategoryArray: string[]) => {
    const allCategoryTXTFile = await Promise.all(
        pureCategoryArray.map(async (category) => {
            const descriptionFilePath = `${blogContentsDir}/${category}/${DESCRIPTION_FILE_NAME}${FILE_FORMAT.TXT}`
            try {
                const description = await readFile(descriptionFilePath, "utf-8")
                if (!description)
                    throw new BlogFileExtractionError({
                        errorNameDescription:
                            "contents -> description file extraction error",
                        readingFileFormat: ".txt",
                        readingFileLocation: descriptionFilePath,
                        readingFileName: DESCRIPTION_FILE_NAME,
                    })
                return description.trim()
            } catch (err) {
                throw new BlogErrorAdditionalInfo({
                    passedError: err,
                    errorNameDescription:
                        "[contents] category description file name 📝 incorrection",

                    message: `"description.txt" in ${category} File at\n\n${descriptionFilePath}`,
                })
            }
        })
    )

    return allCategoryTXTFile
}

const SPLIT_COLOR_REGEX = /color:/
const SPLIT_EMOJI_REGEX = /emoji:/
const EMOJI_REGEX = /\p{Emoji}/u

interface ExtractedCategoryInfoType {
    description: string
    color: string
    emoji: string
}
const NOT_FOUND = "NOT_FOUND" as const

/**
 * used on `.txt` format
 * @returns `desciprition`: remove `color: ...`, `emoji: ...` from txt files
 * @returns `color`: HEX or rgb or rgba
 * @returns `emoji`: Only one emoji
 * @param categoryTXTFile `description.txt` file
 */
const extractCategoryInfo = (
    categoryTXTFile: string
): ExtractedCategoryInfoType => {
    const HEX_REGEX = /^#[a-z|A-Z|0-9]{5}[a-z|A-Z|0-9]{1}$/g
    const isColor = (color: string) => HEX_REGEX.test(color)
    const isEmoji = (text: string) => EMOJI_REGEX.test(text)

    const [splitFirst, splitSecond] = categoryTXTFile.split(SPLIT_COLOR_REGEX)
    const firstSplit = splitFirst
        .split(SPLIT_EMOJI_REGEX)
        .map((txt) => txt.trim())
    const secondSplit = splitSecond
        .split(SPLIT_EMOJI_REGEX)
        .map((txt) => txt.trim())

    const extractedStringArray = firstSplit.concat(secondSplit)

    const categoryInfo = extractedStringArray.reduce<ExtractedCategoryInfoType>(
        (accCategoryInfo, currValue) => {
            if (isColor(currValue))
                return {
                    ...accCategoryInfo,
                    color: currValue,
                }
            if (isEmoji(currValue)) {
                const emojiExec = EMOJI_REGEX.exec(currValue)
                const isEmojiNotExists = emojiExec === null

                if (isEmojiNotExists)
                    throw new BlogPropertyError({
                        errorNameDescription:
                            "Error Occured while extracting category description [emoji]",
                        propertyName: "emoji",
                        propertyType: "string",
                        customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
                    })
                else
                    return {
                        ...accCategoryInfo,
                        emoji: emojiExec[0],
                    }
            }
            return {
                ...accCategoryInfo,
                description: currValue.replace(/\n/g, ""),
            }
        },
        {
            color: NOT_FOUND,
            description: NOT_FOUND,
            emoji: NOT_FOUND,
        }
    )

    const isColorError =
        categoryInfo.color === NOT_FOUND || !isColor(categoryInfo.color)
    const isEmojiError = categoryInfo.emoji === NOT_FOUND
    const isDescriptionError =
        categoryInfo.description === NOT_FOUND ||
        categoryInfo.description === ""

    if (isColorError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [color]",
            propertyName: "color",
            propertyDescription:
                "should be HEX: #⚪️⚪️⚪️⚪️⚪️⚪️, if you activate useTXT config option",
            propertyType: "string",
            errorPropertyValue: categoryInfo.color,
            customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
        })

    if (isEmojiError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [emoji]",
            propertyName: "emoji",
            propertyType: "string",
            customeErrorMessage: `Track file's description🔎: \n      ${categoryInfo.description}`,
        })

    if (isDescriptionError)
        throw new BlogPropertyError({
            errorNameDescription:
                "Error Occured while extracting category description [description]",
            propertyName: "description",
            propertyDescription: categoryInfo.description,
            propertyType: "string",
            customeErrorMessage: `Track file's color🔎: ${categoryInfo.color}\n      file's emoji🔎: ${categoryInfo.emoji}`,
        })

    return categoryInfo
}

/**
 * used on `.txt` format
 * @returns `category`: category name
 * @returns `description`: category description
 * @returns `categoryUrl`: category link
 * @returns `color`: category color
 * @returns `emoji`: category emoji
 */
const getAllCategoryInfoByTXT = async (): Promise<CategoryInfoType[]> => {
    const categoryArray = await getAllCategoryName()
    const categoryTXTFileArray = await readAllCategoryTXTFile(categoryArray)
    const allCategoryInfo = new Array(categoryArray.length)
        .fill(0)
        .map((_, idx) => {
            const { description, color, emoji } = extractCategoryInfo(
                categoryTXTFileArray[idx]
            )

            return {
                category: categoryArray[idx],
                description,
                categoryUrl: `/${categoryArray[idx]}`,
                color,
                emoji,
            }
        })

    return allCategoryInfo
}
//* ----------------------------- 🔥 category info - JSON 🔥 -----------------------------
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
const getAllCategoryInfoByJSON = async () =>
    await readAllCategoryJSONFile(await getAllCategoryName())

//* ----------------------------- 🔥 category - main 🔥 -----------------------------
/**
 * @param useTXT if `true` extract description from `description.txt`
 */
const getAllCategoryInfo = async ({ useTXT = false }: { useTXT: boolean }) => {
    const allCategoryInfo = useTXT
        ? await getAllCategoryInfoByTXT()
        : await getAllCategoryInfoByJSON()
    return allCategoryInfo
}

/**
 * set number of main category in `blog.config` at `config.numberOfMainPageCategory`
 */
const getMainCategoryInfo = async ({ useTXT }: { useTXT: boolean }) =>
    (
        await getAllCategoryInfo({
            useTXT,
        })
    )
        .sort()
        .slice(0, config.numberOfMainPageCategory)

/**
 * @returns `category`: category name
 * @returns `description`: category description
 * @returns `categoryUrl`: category link
 * @returns `color`: category color
 * @returns `emoji`: category emoji
 */
const getSingleCategoryInfo = async ({
    category,
    useTXT = false,
}: {
    category: string
    useTXT: boolean
}): Promise<CategoryInfoType> => {
    const allCategoryInfo = await getAllCategoryInfo({
        useTXT,
    })
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
