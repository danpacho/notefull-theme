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

interface SeriesHeaderProps {
    title: string
    hex: string
    postNumber: number
    seriesInfoArray: SeriesInfoType[]
}
function SeriesContainer({
    title,
    hex,
    postNumber,
    seriesInfoArray,
}: SeriesHeaderProps) {
    const [headerOpen, setHeaderOpen] = useState(false)

    return (
        <>
            <div
                className={`w-full ${tw.boxBorder} flex flex-col gap-1 border-b-2 p-2 cursor-pointer transition`}
            >
                <RowBetween
                    onClick={() => setHeaderOpen((headerOpen) => !headerOpen)}
                >
                    <Title size="text-sm" mdSize="md:text-sm">
                        {title}
                    </Title>
                    <ColorBox hex={hex} varients="double-bg-border">
                        <Bookmark
                            style={{
                                fill: hex,
                            }}
                        />
                        <p>{postNumber}</p>
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
