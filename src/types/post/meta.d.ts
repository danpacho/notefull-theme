/**
 * meta of pure mdx string
 */
export interface MDXMetaType {
    title: string
    preview: string
    author: string
    update: string
    color: string
    tags: string
    postpone?: string
    reference?: string
    series?: string
}

export interface SeriesMetaType {
    seriesTitle: string
    order: number
}
/**
 * total post meta property with {@link MDXMetaType} and {@link SeriesMetaType}
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
}
