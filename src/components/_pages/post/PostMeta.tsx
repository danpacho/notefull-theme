import type { PropsWithChildren } from "react"

import Link from "next/link"

import { ColorBox } from "@components/_atoms"

const RowContainer = ({ children }: PropsWithChildren<React.ReactNode>) => (
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
function PostMeta({ metaArray, hex }: PostMetaProps) {
    return (
        <RowContainer>
            {metaArray.map((meta, order) => {
                const isLinkIncluded = typeof meta !== "string"
                if (isLinkIncluded)
                    return (
                        <ColorBox
                            hex={hex}
                            varients="double-bg-border"
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
                            varients="double-bg-border"
                            key={meta}
                        >
                            <a className="hover:underline" href={meta}>
                                Link {order + 1} 🔗
                            </a>
                        </ColorBox>
                    )

                return (
                    <ColorBox hex={hex} varients="double-bg-border" key={meta}>
                        {meta}
                    </ColorBox>
                )
            })}
        </RowContainer>
    )
}

export default PostMeta
