import Link from "next/link"

import { CategoryInfoType } from "@typing/category"

import { IconBox, RowBetween } from "@components/_atoms"

function CategoryLink({
    category,
    categoryUrl,
    color,
    description,
    emoji,
}: CategoryInfoType) {
    return (
        <Link passHref href={categoryUrl}>
            <div className="flex flex-col gap-4 p-3 transition border border-b-2 border-gray-200 cursor-pointer dark:border-gray-500 hover:border-black dark:hover:border-gray-100">
                <RowBetween>
                    <h1 className="heading_text text-md md:text-lg">
                        {category}
                    </h1>
                    <IconBox hex={color}>{emoji}</IconBox>
                </RowBetween>

                <div className="w-full h-10 overflow-hidden text-sm description_text">
                    {description}
                </div>
            </div>
        </Link>
    )
}

export default CategoryLink
