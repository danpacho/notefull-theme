import { SeriesMetaType } from "./meta"

export interface SeriesInfoType extends SeriesMetaType {
    postTitle: string
    color: string
    url: string
    prevLink: string | null
    nextLink: string | null
}

export interface SeriesType {
    seriesTitle: string
    seriesInfo: SeriesInfoType[]
}
