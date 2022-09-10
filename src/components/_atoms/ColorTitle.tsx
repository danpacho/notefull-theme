import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { TailwindFontSizeType } from "@typing/tailwind"

const getRandBetween = (maxNum: number) => Math.floor(Math.random() * maxNum)

const getIndexOfSpaceCharacter = (strArr: string[]) => {
    const spaceIndex = []
    for (let index = 0; index < strArr.length; index++) {
        if (strArr[index] === " ") spaceIndex.push(index)
    }
    return spaceIndex
}

const getSplitedText = (text: string) =>
    [...new Intl.Segmenter().segment(text)].map((x) => x.segment)

const skewStyle = {
    leftEnd: "hover:skew-y-12 hover:-rotate-12",
    left: "hover:skew-y-6 hover:-rotate-6",
    neutral: "animate-pulse",
    right: "hover:-skew-y-6 hover:rotate-6",
    rightEnd: "hover:-skew-y-12 hover:rotate-12",
} as const
type SkewType = keyof typeof skewStyle

const commonCharacterStyle =
    "transition min-w-[0.5rem] hover:scale-110" as const

interface ColorTitleProps {
    title: string
    hex: string
    size: TailwindFontSizeType
    mdSize?: `md:${TailwindFontSizeType}`
    href?: string
}
function ColorTitle({ title, hex, size, mdSize, href }: ColorTitleProps) {
    const splitedTitle = useMemo(() => getSplitedText(title), [title])
    const spaceIndexArr = useMemo(
        () => getIndexOfSpaceCharacter(splitedTitle),
        [splitedTitle]
    )
    const titleLength = title.length

    const [focusNum, setFocusNum] = useState(titleLength + 1)
    useEffect(() => {
        const randNum = getRandBetween(titleLength)
        const focusNum = spaceIndexArr.includes(randNum) ? randNum + 1 : randNum
        setFocusNum(focusNum)
    }, [titleLength, spaceIndexArr])

    const [skew, setSkew] = useState<SkewType>("neutral")
    useEffect(() => {
        const mid = titleLength / 2
        const isEven = titleLength % 2 === 0
        const focusLocation = focusNum + 1

        switch (isEven) {
            case true:
                if (focusLocation === 1) setSkew("leftEnd")
                else if (focusLocation === titleLength) setSkew("rightEnd")
                else if (focusLocation <= mid) setSkew("left")
                else setSkew("right")
                return
            case false:
                if (focusLocation === Math.floor(mid) + 1) setSkew("neutral")
                else if (focusLocation === 1) setSkew("leftEnd")
                else if (focusLocation === titleLength) setSkew("rightEnd")
                else if (focusLocation < mid) setSkew("left")
                else setSkew("right")
                return
            default:
                return
        }
    }, [focusNum, titleLength])

    const onPointerFocusCharacter = useCallback(
        (index: number, spaceIndexArr: number[]) =>
            spaceIndexArr.includes(index)
                ? setFocusNum(index + 1)
                : setFocusNum(index),
        []
    )

    return (
        <Link passHref href={href ?? "/"}>
            <div
                className={`${skewStyle[skew]} ${size} ${mdSize} 
                            flex flex-row flex-wrap w-fit py-4
                            font-bold 
                            origin-left active:scale-90 transform-gpu
                            cursor-pointer select-none transition`}
            >
                {splitedTitle.map((character, index) => {
                    const isFirstCharacter = index === 0
                    const isFocused = index === focusNum
                    const style = isFocused
                        ? {
                              color: hex,
                          }
                        : {}
                    return (
                        <p
                            key={character + index}
                            style={style}
                            className={
                                isFirstCharacter
                                    ? `${commonCharacterStyle} capitalize`
                                    : commonCharacterStyle
                            }
                            onPointerEnter={() =>
                                onPointerFocusCharacter(index, spaceIndexArr)
                            }
                        >
                            {character}
                        </p>
                    )
                })}
            </div>
        </Link>
    )
}

export default ColorTitle
