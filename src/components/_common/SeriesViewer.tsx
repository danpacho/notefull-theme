import tw from "@styles/tailwind.util"

import { useCallback, useState } from "react"

import { SeriesType } from "@typing/post/series"

import { Grid, Title } from "@components/_atoms"
import { Arrow } from "@components/_icons"

import SeriesContainer from "./SeriesContainer"

function usePagination<T>({
    paginationMount,
    paginatedArray,
}: {
    paginationMount: number
    paginatedArray: T[]
}) {
    const [currentPage, setCurrentPage] = useState(0) // [ 0 ] for index location [ +1 ] for page

    const currentArray = paginatedArray.slice(
        currentPage,
        paginationMount + currentPage
    )

    const maxPage = Math.round(paginatedArray.length / paginationMount) - 1
    const toNext = useCallback(
        () => setCurrentPage((page) => (page < maxPage ? page + 1 : page)),
        [maxPage]
    )

    const toPrev = useCallback(
        () => setCurrentPage((page) => (page > 0 ? page - 1 : page)),
        []
    )

    return {
        currentArray,
        currentPage: currentPage + 1,
        toNext,
        toPrev,
        isLastPage: currentPage === maxPage,
        isFirstPage: currentPage === 0,
    }
}

const PaginationBtn = ({
    onClick,
    disabled,
    type = "prev",
}: {
    onClick: () => void
    disabled: boolean
    type: "prev" | "next"
}) => (
    <button
        type="button"
        title={type}
        className="p-2.5"
        onClick={onClick}
        disabled={disabled}
    >
        <Arrow
            className={
                type === "prev" ? "fill-current rotate-180" : "fill-current"
            }
            style={
                disabled
                    ? {
                          opacity: 0.25,
                      }
                    : {}
            }
        />
    </button>
)

interface SeriesViwerProps {
    allSeriesInfo: SeriesType[]
    color: string
}
function SeriesViewer({ allSeriesInfo, color }: SeriesViwerProps) {
    const {
        currentPage,
        currentArray,
        toNext,
        toPrev,
        isFirstPage,
        isLastPage,
    } = usePagination<SeriesType>({
        paginatedArray: allSeriesInfo,
        paginationMount: 2,
    })

    return (
        <Grid
            mdCol="md:grid-cols-2"
            col="grid-cols-1"
            gap="gap-4"
            styleClass="relative"
        >
            <div
                className={`${tw.border} absolute -top-16 right-0 flex flex-row items-center justify-center transition border-b-2 hover:underline select-none`}
            >
                <PaginationBtn
                    type="prev"
                    onClick={toPrev}
                    disabled={isFirstPage}
                />
                <Title mdSize="md:text-sm" size="text-sm">
                    {currentPage}
                </Title>
                <PaginationBtn
                    type="next"
                    onClick={toNext}
                    disabled={isLastPage}
                />
            </div>

            {currentArray.map(({ seriesTitle, seriesInfo }) => (
                <div
                    className="flex flex-col justify-start items-start gap-2 w-full"
                    key={seriesTitle}
                >
                    <SeriesContainer
                        hex={color}
                        seriesTitle={seriesTitle}
                        seriesCount={seriesInfo.length}
                        seriesInfoArray={seriesInfo}
                    />
                </div>
            ))}
        </Grid>
    )
}

export default SeriesViewer
