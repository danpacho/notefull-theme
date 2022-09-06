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

const tiltStyle = {
    leftLg: "hover:-rotate-1 hover:scale-95 hover:translate-y-1",
    left: "hover:-rotate-2 hover:translate-y-1",
    neutral: "hover:rotate-0 hover:translate-y-0.5",
    right: "hover:rotate-2 hover:translate-y-1",
    rightLg: "hover:rotate-1 hover:scale-95 hover:translate-y-1",
}
type TiltType = keyof typeof tiltStyle

const characterStyle = {
    first: "capitalize transition hover:scale-110 min-w-[0.5rem]",
    rest: "transition hover:scale-110 min-w-[0.5rem]",
}

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

    const [tilte, setTilte] = useState<TiltType>("neutral")
    useEffect(() => {
        const isEven = titleLength % 2 === 0
        const mid = titleLength / 2
        const focusLocation = focusNum + 1
        switch (isEven) {
            case true:
                if (focusLocation === 1) setTilte("leftLg")
                else if (focusLocation === titleLength) setTilte("rightLg")
                else if (focusLocation <= mid) setTilte("left")
                else setTilte("right")
                return
            case false:
                if (focusLocation === Math.floor(mid) + 1) setTilte("neutral")
                else if (focusLocation === 1) setTilte("leftLg")
                else if (focusLocation === titleLength) setTilte("rightLg")
                else if (focusLocation < mid) setTilte("left")
                else setTilte("right")
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
                className={`${tiltStyle[tilte]} ${size} ${mdSize} py-4 truncate font-bold flex flex-rowv flex-wrap select-none transition active:scale-90 cursor-pointer`}
            >
                {splitedTitle.map((character, index) => {
                    const isFirstCharacter = index === 0
                    if (index === focusNum)
                        return (
                            <p
                                key={character + index}
                                className={
                                    isFirstCharacter
                                        ? characterStyle.first
                                        : characterStyle.rest
                                }
                                style={{
                                    color: hex,
                                }}
                                onPointerEnter={() =>
                                    onPointerFocusCharacter(
                                        index,
                                        spaceIndexArr
                                    )
                                }
                            >
                                {character}
                            </p>
                        )
                    return (
                        <p
                            key={character + index}
                            className={
                                isFirstCharacter
                                    ? characterStyle.first
                                    : characterStyle.rest
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
