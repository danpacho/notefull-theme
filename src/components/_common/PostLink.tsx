import Link from "next/link"

import tw from "@styles/tailwind.util"

import { MetaType } from "@typing/post/meta"

import { Pencil } from "@components/_icons"
import { Description, ColorBox, RowBetween, Title } from "@components/_atoms"

function PostLink({
    title,
    preview,
    tags,
    category,
    update,
    color,
    postUrl,
}: MetaType) {
    return (
        <Link passHref href={postUrl}>
            <div
                className={`flex flex-col gap-4 px-3 py-4 transition ${tw.boxBorder} border-l-2 cursor-pointer`}
            >
                <RowBetween>
                    <Title>{title}</Title>
                    <ColorBox hex={color} varients="bg-border">
                        <Pencil className="fill-current" />
                    </ColorBox>
                </RowBetween>

                <div className="flex flex-row items-center justify-start gap-1 text-sm font-light text-gray-400 truncate">
                    <Link href={`/${category}`}>
                        <p className="hover:text-black dark:hover:text-gray-100">
                            {category},
                        </p>
                    </Link>
                    {update},
                    {tags.map((tag) => (
                        <p key={tag}>#{tag}</p>
                    ))}
                </div>
                <Description>{preview}</Description>
            </div>
        </Link>
    )
}

export default PostLink
