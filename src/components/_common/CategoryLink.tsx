import Link from "next/link"

import { CategoryInfoType } from "@typing/category"

import { IconBox, RowBetween } from "@components/_atoms"

const CategoryLink = ({
    category,
    categoryUrl,
    color,
    description,
    emoji,
}: CategoryInfoType) => {
    return (
        <Link passHref href={categoryUrl}>
            <div className="flex flex-col gap-4 p-3 transition border border-b-2 border-gray-200 cursor-pointer hover:border-black">
                <RowBetween>
                    <h1 className="font-bold text-black capitalize truncate text-md md:text-lg">
                        {category}
                    </h1>
                    <IconBox hex={color}>{emoji}</IconBox>
                </RowBetween>

                <div className="w-full h-10 overflow-hidden text-sm font-light text-gray-500 text-ellipsis">
                    {description}
                </div>
            </div>
        </Link>
    )
}

export default CategoryLink
