import { TableOfContents } from "@lib/unified"
import { MetaType } from "./meta"

export interface CategoryPostType {
    category: string
    allCategoryPost: PostType[]
    postCount: number
}

export interface PostType {
    meta: MetaType
    source: string
    toc: TableOfContents[]
}

export interface PostWithControllerType extends PostType {
    controller: PostControllerType
}

interface PostControllerInfoType {
    title: string
    link: string
}
export interface PostControllerType {
    prevPost: PostControllerInfoType
    nextPost: PostControllerInfoType
}
