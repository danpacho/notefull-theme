import type { TableOfContentsType } from "@lib/remark/getTableOfContents"
import type { MetaType } from "./meta"

/**
 * single post type
 * @property **meta**: meta of the post. Check {@link MetaType}
 * @property **soure**: post source. this `string` will be compiled by `mdx-bundler`
 * @property **toc**: table of contents of post, `H1 ➡️ H2` nesting support. Check {@link TableOfContentsType}
 */
export interface PostType {
    meta: MetaType
    source: string
    toc: TableOfContentsType[]
}
/**
 * - post with controller
 * - move the post back and forth using `controller` object
 * - check **controller text** option at `config.postControllerText`
 * @example
 * const meta = {
 *     controller: {
 *          prevPost: {
 *              title: "prev post",
 *              link: "category/1/prev-post"
 *          },
 *          nextPost: {
 *              title: "next post",
 *              link: "category/1/next-post"
 *          }
 *     }
 *     ...rest,
 * }
 */
export interface PostWithControllerType extends PostType {
    controller: PostControllerType
}

export interface PostControllerInfoType {
    title: string
    link: string
}
export interface PostControllerType {
    prevPost: PostControllerInfoType
    nextPost: PostControllerInfoType
}

/**
 * all post type, inside of specific category
 * @property **category**: category-name of the post
 * @property **allCategoryPost**: whole post of the specific category
 * @property **postCount**: number of post in the specific category
 */
export interface AllPostOfSpecificCategoryType {
    category: string
    allCategoryPost: PostType[]
    postCount: number
}
