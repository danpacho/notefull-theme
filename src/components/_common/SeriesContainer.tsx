import tw from "@styles/tailwind.util"

import { useState } from "react"
import Link from "next/link"

import { SeriesInfoType } from "@typing/post/series"

import { Description, ColorBox, RowBetween, Title } from "@components/_atoms"
import { Bookmark } from "@components/_icons"

interface SeriesLinkProps {
    title: string
    href: string
    order: number
}
function SeriesLink({ title, href, order }: SeriesLinkProps) {
    return (
        <Link passHref href={href}>
            <div
                className={`w-full cursor-pointer pt-0.5 pb-1.5 transition hover:underline`}
            >
                <Description size="text-sm" mdSize="md:text-sm">
                    {order}. {title}
                </Description>
            </div>
        </Link>
    )
}

export interface SeriesHeaderProps {
    hex: string
    seriesTitle: string
    seriesCount: number
    seriesInfoArray: SeriesInfoType[]
}
function SeriesContainer({
    seriesTitle,
    seriesCount,
    seriesInfoArray,
    hex,
}: SeriesHeaderProps) {
    const [headerOpen, setHeaderOpen] = useState(false)

    return (
        <>
            <div
                className={`w-full ${tw.border} flex flex-col gap-1 border-b-2 p-2 cursor-pointer transition`}
            >
                <RowBetween
                    onClick={() => setHeaderOpen((headerOpen) => !headerOpen)}
                >
                    <Title size="text-sm" mdSize="md:text-base">
                        {seriesTitle}
                    </Title>
                    <ColorBox hex={hex} varients="double-bg-border">
                        <Bookmark
                            style={{
                                fill: hex,
                            }}
                        />
                        <p>{seriesCount}</p>
                    </ColorBox>
                </RowBetween>

                {headerOpen && (
                    <div className="flex flex-col justify-start items-center pt-2">
                        {seriesInfoArray.map(({ order, postTitle, url }) => (
                            <SeriesLink
                                key={postTitle}
                                title={postTitle}
                                href={url}
                                order={order}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default SeriesContainer
