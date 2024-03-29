"use client"

import type { PropsWithChildren } from "react"

import Link from "next/link"

import { ColorBox } from "~/components/common/atoms"

const RowContainer = ({ children }: PropsWithChildren) => (
    <div className="flex flex-row flex-wrap gap-2 max-w-full">{children}</div>
)

type MetaType =
    | {
          content: string
          path: string
      }
    | string
/**
 * @property `metaArray`: array of `MetaType`
 * @note `MetaType` is `string` or `{ content: string; path: string }`
 * @example
 *  <PostMeta
        metaArray={[
            "just text",
            { content: "link text", path: `/link href` },
        ]}
        hex={hex}
    />
 */
interface PostMetaProps {
    metaArray: MetaType[]
    hex: string
}
export const PostMeta = ({ metaArray, hex }: PostMetaProps) => {
    return (
        <RowContainer>
            {metaArray.map((meta, order) => {
                const isLinkIncluded = typeof meta !== "string"
                if (isLinkIncluded)
                    return (
                        <ColorBox
                            hex={hex}
                            style="border"
                            layout="flex"
                            key={meta.content}
                        >
                            <Link href={meta.path}>{meta.content}</Link>
                        </ColorBox>
                    )

                const isExternalLink = meta.startsWith("http")
                if (isExternalLink)
                    return (
                        <ColorBox
                            hex={hex}
                            style="border"
                            layout="flex"
                            key={meta}
                        >
                            <a className="hover:underline" href={meta}>
                                Link {order + 1} 🔗
                            </a>
                        </ColorBox>
                    )

                return (
                    <ColorBox hex={hex} style="border" layout="flex" key={meta}>
                        {meta}
                    </ColorBox>
                )
            })}
        </RowContainer>
    )
}
