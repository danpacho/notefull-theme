import tw from "@styles/tailwind.util"

import Link from "next/link"

import type { PostControllerInfoType as LinkInfo } from "@typing/post"

import { Description, RowBetween } from "@components/_atoms"
import { Arrow } from "@components/_icons"

interface PostLinkProps extends LinkInfo {
    type: "prev" | "next"
}
const PageLink = ({ title, link, type }: PostLinkProps) => {
    const isPrev = type === "prev"
    return (
        <Link href={link} passHref>
            <button
                type="button"
                aria-label={`${type} post: ${title}`}
                title={type}
                className={`flex ${
                    isPrev
                        ? "flex-row border-l-2 hover:-translate-x-1"
                        : "flex-row-reverse border-r-2 hover:translate-x-1"
                } items-center justify-center gap-2.5 ${
                    tw.border
                } w-full px-2.5 py-1.5 md:w-fit md:px-3 md:py-1 hover:underline transition`}
            >
                <Arrow className={`fill-current ${isPrev && "rotate-180"}`} />
                <Description
                    size="text-sm"
                    mdSize="md:text-base"
                    styleClass={isPrev ? "text-left" : "text-right"}
                >
                    {title}
                </Description>
            </button>
        </Link>
    )
}

interface PageLinkControllerProps {
    prev: LinkInfo
    next: LinkInfo
}
function PageLinkController({ prev, next }: PageLinkControllerProps) {
    return (
        <RowBetween styleClass="md:flex-row flex-col-reverse gap-3 pt-4 pb-8">
            <PageLink type="prev" {...prev} />
            <PageLink type="next" {...next} />
        </RowBetween>
    )
}

export default PageLinkController
