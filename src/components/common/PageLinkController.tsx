"use client"

import { util } from "~/styles/tailwind.util"

import Link from "next/link"

import type { PostControllerInfoType } from "src/interface/post"
import { Description, RowBetween } from "~/components/common/atoms"
import { Arrow } from "~/components/icons"
import { tw } from "~/styles/tailwind"

const pageLinkBtn = tw
    .toggle({
        base: {
            display: "flex",
            alignItems: "items-center",
            justifyContent: "justify-center",
            gap: "gap-2.5",

            width: "w-full",
            paddingX: "px-2.5",
            paddingY: "py-2.5",
            "@md": {
                width: "md:w-fit",
                paddingX: "md:px-3",
                paddingY: "md:py-1",
            },
            ":hover": {
                textDecorationLine: "hover:underline",
            },
            transition: "transition",
        },
        truthy: {
            borderLeftWidth: "border-l-2",
            flexDirection: "flex-row",
            ":hover": {
                transformTranslateX: "hover:-translate-x-1",
            },
        },
        falsy: {
            borderRightWidth: "border-r-2",
            flexDirection: "flex-row-reverse",
            ":hover": {
                transformTranslateX: "hover:translate-x-1",
            },
        },
    })
    .compose(util.border.style)

interface PostLinkProps extends PostControllerInfoType {
    type: "prev" | "next"
}
export const PageLink = ({ title, link, type }: PostLinkProps) => {
    const isPrev = type === "prev"
    return (
        <Link href={link} passHref>
            <button
                type="button"
                aria-label={`${type} post: ${title}`}
                title={type}
                className={pageLinkBtn.class(isPrev)}
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
    prev: PostControllerInfoType
    next: PostControllerInfoType
}
export const PageLinkController = ({ prev, next }: PageLinkControllerProps) => {
    return (
        <RowBetween styleClass="md:flex-row flex-col-reverse gap-3 pt-4 pb-8">
            <PageLink type="prev" {...prev} />
            <PageLink type="next" {...next} />
        </RowBetween>
    )
}
