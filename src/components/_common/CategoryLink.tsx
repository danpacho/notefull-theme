import { CategoryInfoType } from "@typing/category"

import Link from "next/link"

import { Description, ColorBox, RowBetween, Title } from "@components/_atoms"

import tw from "@styles/tailwind.util"

function CategoryLink({
    category,
    categoryUrl,
    color,
    description,
    emoji,
}: CategoryInfoType) {
    return (
        <Link passHref href={categoryUrl}>
            <div
                className={`flex flex-col gap-4 p-3 transition ${tw.border} border-b-2 cursor-pointer`}
            >
                <RowBetween>
                    <Title>{category}</Title>
                    <ColorBox hex={color}>{emoji}</ColorBox>
                </RowBetween>

                <Description styleClass="h-10">{description}</Description>
            </div>
        </Link>
    )
}

export default CategoryLink
