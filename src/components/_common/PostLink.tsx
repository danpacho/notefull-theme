import { IconBox, RowBetween } from "@components/_atoms"
import { MetaType } from "@typing/post/meta"
import Link from "next/link"

const Order = "ABCDEFGHIJKLMNOPQR"
function PostLink({
    title,
    postOrder,
    preview,
    tags,
    category,
    update,
    color,
    postUrl,
}: MetaType) {
    return (
        <Link passHref href={postUrl}>
            <div className="flex flex-col gap-4 px-3 py-4 transition border border-l-2 cursor-pointer dark:border-gray-500 hover:border-black dark:hover:border-gray-100">
                <RowBetween>
                    <h1 className="heading_text text-md md:text-lg">{title}</h1>
                    <IconBox hex={color}>{Order[postOrder]}</IconBox>
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
                <div className="w-full overflow-hidden text-sm description_text">
                    {preview}
                </div>
            </div>
        </Link>
    )
}

export default PostLink
