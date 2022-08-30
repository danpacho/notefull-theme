import { CategoryInfoType } from "@typing/category"

import Link from "next/link"
import { Description, IconBox, RowBetween, Title } from "@components/_atoms"

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
                className={`flex flex-col gap-4 p-3 transition ${tw.boxBorder} border-b-2 cursor-pointer`}
            >
                <RowBetween>
                    <Title>{category}</Title>
                    <IconBox hex={color}>{emoji}</IconBox>
                </RowBetween>

                <Description styleClass="h-10">{description}</Description>
            </div>
        </Link>
    )
}

export default CategoryLink
