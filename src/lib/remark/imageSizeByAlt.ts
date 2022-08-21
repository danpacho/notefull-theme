import imageSize from "image-size"
import { promisify } from "util"

import { visit } from "unist-util-visit"
import type { Node } from "unist"

import { findMarkdownElment, MarkdownNodeType } from "./findMarkdownElement"

import { BlogErrorAdditionalInfo, BlogFileExtractionError } from "@core/error"

const sizeOf = promisify(imageSize)

const getImageSize = async (src: string) => {
    const STATIC_IMAGE_URL = `public/${src}`
    try {
        const sizeResult = await sizeOf(STATIC_IMAGE_URL)

        if (sizeResult === undefined)
            throw new BlogFileExtractionError({
                errorNameDescription: "markdown invalid image url",
                readingFileFormat: "image",
                readingFileLocation: STATIC_IMAGE_URL,
                readingFileName: "public folder",
            })

        if (sizeResult.width === undefined || sizeResult.height === undefined) {
            throw new BlogFileExtractionError({
                errorNameDescription: "image size extraction error",
                readingFileFormat: "image",
                readingFileLocation: STATIC_IMAGE_URL,
                readingFileName: "public folder",
            })
        }

        return {
            width: sizeResult.width,
            height: sizeResult.height,
        }
    } catch (e: unknown) {
        throw new BlogErrorAdditionalInfo({
            passedError: e,
            errorNameDescription: "unknown markdown image error",
            message: "please check your image url or source",
        })
    }
}

type ImageAltType = `${string}:${number}:${number}`
const getImageSizedAlt = async ({
    inputAlt,
    url,
}: {
    inputAlt: string
    url: string
}): Promise<ImageAltType> => {
    const { width, height } = await getImageSize(url)
    return `${inputAlt}:${width}:${height}`
}
interface ImageNodeType extends MarkdownNodeType {
    title?: string
    url: string
    alt: string
}

const remarkImageSizeByAlt = () => async (tree: Node) => {
    const { matchedNode, notFound } = findMarkdownElment(tree, ["image"])

    if (!notFound) {
        const isExternalUrl = (url: string) => url.startsWith("http")

        const imageSizeAltArray = await (matchedNode as ImageNodeType[]).reduce<
            Promise<ImageAltType[]>
        >(async (acc, { alt, url }) => {
            const awaitedAcc = await acc

            if (!isExternalUrl(url)) {
                const imageSizeAlt = await getImageSizedAlt({
                    inputAlt: alt,
                    url,
                })
                return [...awaitedAcc, imageSizeAlt]
            }
            return awaitedAcc
        }, Promise.resolve([] as ImageAltType[]))

        let order = 0
        visit(tree, "image", (imageNode: ImageNodeType) => {
            if (!isExternalUrl(imageNode.url)) {
                imageNode.alt = imageSizeAltArray[order]
                order++
            }
        })
    }
}

export default remarkImageSizeByAlt
