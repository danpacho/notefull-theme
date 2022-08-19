import type { SeriesMetaType } from "./meta"

/**
 * series info
 * @property **seriesTitle**: `title` of series
 * @property **order**: `order` of a series
 * @property **postTitle**: `title` of a series of post
 * @property **color**: `color` of a series of post
 * @property **url**: `postUrl` of a series of post
 * @property **prevLink**: prvious post of series. If the current post is the first series, `prevLink` is `null`
 * @property **nextLink**: next post of series. If the current post is the last series, `nextLink` is `null`
 * @example
 * const firstSeries = {
 *      seriesTitle: "First series 🎉"
 *      order: 1
 *      postTitle: "First post 🎉"
 *      color: "#8a7354"
 *      url: "/category/1/first-1"
 *      prevLink: null
 *      nextLink: "/category/1/first-2'
 * } 

*/
export interface SeriesInfoType extends SeriesMetaType {
    postTitle: string
    color: string
    url: string
    prevLink: string | null
    nextLink: string | null
}

/**
 * - total series info of specific series
 * - set of {@link SeriesInfoType}
 */
export interface SeriesType {
    seriesTitle: string
    seriesInfo: SeriesInfoType[]
}
