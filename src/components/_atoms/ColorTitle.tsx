import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { Tailwind, tw } from "@lib/wind"
import { GetVariants } from "tailwindest"

const getRandBetween = (maxNum: number) => Math.floor(Math.random() * maxNum)

const getIndexOfSpaceCharacter = (strArr: string[]) => {
    const spaceIndex = []
    for (let index = 0; index < strArr.length; index++) {
        if (strArr[index] === " ") spaceIndex.push(index)
    }
    return spaceIndex
}

const getSplicedText = (text: string) =>
    [...new Intl.Segmenter().segment(text)].map((x) => x.segment)

const titleSkew = tw.rotary({
    base: {
        display: "flex",
        flexDirection: "flex-row",
        flexWrap: "flex-wrap",

        width: "w-fit",

        paddingY: "py-4",

        fontWeight: "font-bold",

        transition: "transition",
        transformOrigin: "origin-left",
        transformGPU: "transform-gpu",
        ":active": {
            transformScale: "active:scale-90",
        },

        cursor: "cursor-pointer",
        userSelect: "select-none",
        "::before": {
            content: "before:content-none",
            "::after": {
                backgroundColor: "before:after:bg-amber-200",
            },
        },
    },

    left: {
        ":hover": {
            transformSkewY: "hover:skew-y-12",
            transformRotate: "hover:-rotate-12",
        },
    },
    leftEnd: {
        ":hover": {
            transformSkewY: "hover:skew-y-6",
            transformRotate: "hover:-rotate-6",
        },
    },
    center: {
        animation: "animate-pulse",
    },
    right: {
        ":hover": {
            transformSkewY: "hover:-skew-y-6",
            transformRotate: "hover:rotate-6",
        },
    },
    rightEnd: {
        ":hover": {
            transformSkewY: "hover:-skew-y-12",
            transformRotate: "hover:rotate-12",
        },
    },
})

const characterStyle = tw.toggle({
    base: {
        transition: "transition",
        minWidth: "min-w-[0.5rem]",
        ":hover": { transformScale: "hover:scale-110" },
    },
    truthy: {
        textTransform: "capitalize",
    },
    falsy: {},
})

interface ColorTitleProps {
    title: string
    hex: string
    size: Tailwind["fontSize"]
    mdSize?: `md:${Exclude<Tailwind["fontSize"], undefined>}`
    href?: string
}
const ColorTitle = ({ title, hex, size, mdSize, href }: ColorTitleProps) => {
    const splicedTitle = useMemo(() => getSplicedText(title), [title])
    const spaceIndexArr = useMemo(
        () => getIndexOfSpaceCharacter(splicedTitle),
        [splicedTitle]
    )
    const titleLength = title.length

    const [focusNum, setFocusNum] = useState(titleLength + 1)
    useEffect(() => {
        const randNum = getRandBetween(titleLength)
        const focusNum = spaceIndexArr.includes(randNum) ? randNum + 1 : randNum
        setFocusNum(focusNum)
    }, [titleLength, spaceIndexArr])

    const [skew, setSkew] = useState<GetVariants<typeof titleSkew>>("center")
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
                if (focusLocation === Math.floor(mid) + 1) setSkew("center")
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
                className={tw.mergeProps(titleSkew.style(skew), {
                    fontSize: size,
                    "@md": {
                        fontSize: mdSize,
                    },
                })}
            >
                {splicedTitle.map((character, index) => {
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
                            className={characterStyle.class(isFirstCharacter)}
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
