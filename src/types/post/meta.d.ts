/**
 * optional meta property
 * @property `series`: `{ title }-{ Number_string }` if there is only one series, series will not displayed
 * @property `bannerUrl`: nextjs static image url at [`public`](https://nextjs.org/docs/basic-features/static-file-serving}) folder
 * @property `reference`: `{ ref1 }, { ref2 }, ...`
 * @property `potpone`: `{ Boolean_string }` if `true`, post will not published
 
 * @example
 * ---
 * series: seriesTitle-1
 * bannerUrl: my-category/first-post/banner.png
 * refrence: https://ref1.com, https://ref2.com, https://ref3.com 
 * postpone: true
 * ---
*/
interface OptionalMDXMetaType {
    series?: string
    bannerUrl?: string
    reference?: string
    postpone?: string
}
/**
 * - total meta property
 * - extract with `gray-matter` package
 * - check optional meta property at {@link OptionalMDXMetaType}

 * @property `series`: `{ title }-{ order }`
 * @property `bannerUrl`: nextjs static image url at `public` folder
 * @property `reference`: `{ ref1 }, { ref2 }, ...`
 * @property `potpone`: if `true`, post will not published
 * 
 * @example
 * ---
 * title: this is title
 * preview: this is preview
 * author: this is author name
 * update: 2022/08/15
 * color: "#222660"
 * tags: tag1, tag2, tag3
 * ---
 */
export interface MDXMetaType extends OptionalMDXMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string
}

export interface SeriesMetaType {
    seriesTitle: string
    order: number
}
/**
 * post meta property with {@link MDXMetaType} and {@link SeriesMetaType}
 * @example
 * const postMeta = {
        title: 'say Hi',
        category: 'category',
        preview: 'say Hi's preview!',
        author: 'author name',
        color: '#b8a182',
        update: '2022/06/25',
        tags: ["tag1", "tag2"],
        postUrl: '/category/1/say-hi',
        postOrder: 0,
        postFileName: 'say-hi.mdx',
        bannerUrl: 'banner.png',
        series: [_SeriesMetaType_],
        reference: ["https://google.com", "https://stackoverflow.com"]
        postpone: false,
 * }
 */
export interface MetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string[]
    category: string
    postUrl: string
    postFileName: string
    postOrder: number
    postpone: boolean
    reference: string[] | null
    series: SeriesMetaType | null
    bannerUrl: string | null
}
