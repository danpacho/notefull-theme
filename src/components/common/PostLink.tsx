"use client"

import Link from "next/link"

import { util } from "~/styles/tailwind.util"

import { MetaType } from "src/interface/post/meta"

import { Pencil } from "~/components/icons"
import {
    Description,
    ColorBox,
    RowBetween,
    Title,
} from "~/components/common/atoms"
import { config } from "blog.config"

interface PostLinkProps extends MetaType {
    displayAuthorInsteadCategory?: boolean
}
export const PostLink = ({
    title,
    preview,
    tags,
    category,
    update,
    color,
    postUrl,
    author,
    displayAuthorInsteadCategory = false,
}: PostLinkProps) => {
    return (
        <Link href={postUrl} passHref legacyBehavior>
            <div
                className={`flex flex-col gap-4 px-3 py-4 ${util.border.class} cursor-pointer`}
            >
                <RowBetween>
                    <Title>{title}</Title>
                    <ColorBox hex={color} style="border">
                        <Pencil className="fill-current" />
                    </ColorBox>
                </RowBetween>

                <div className="flex flex-row flex-wrap items-center justify-start gap-1 text-sm font-normal text-gray-400 truncate">
                    {!displayAuthorInsteadCategory && (
                        <Link href={`/${category}`}>
                            <p className="hover:text-black dark:hover:text-gray-100">
                                {category},
                            </p>
                        </Link>
                    )}
                    {displayAuthorInsteadCategory && (
                        <Link href={config.navigationMenu[2].path}>
                            <p className="hover:text-black dark:hover:text-gray-100">
                                {author},
                            </p>
                        </Link>
                    )}
                    {update},
                    {tags.map((tag) => (
                        <div
                            key={tag}
                            className="flex flex-row items-center justify-center gap-[0.5px]"
                        >
                            <p>#</p>
                            <p>{tag}</p>
                        </div>
                    ))}
                </div>
                <Description>{preview}</Description>
            </div>
        </Link>
    )
}
