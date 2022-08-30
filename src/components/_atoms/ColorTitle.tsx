import { useEffect, useState } from "react"
import Link from "next/link"

import { TailwindFontSizeType } from "@typing/tailwind"

const getRandBetween = (maxNum: number) => Math.floor(Math.random() * maxNum)

const tiltStyle = {
    leftLg: "hover:-rotate-6 hover:scale-95 hover:translate-y-1",
    left: "hover:-rotate-2 hover:translate-y-1",
    neutral: "hover:rotate-0 hover:translate-y-0.5",
    right: "hover:rotate-2 hover:translate-y-1",
    rightLg: "hover:rotate-6 hover:scale-95 hover:translate-y-1",
}
type TiltType = keyof typeof tiltStyle

const characterStyle = {
    first: "capitalize transition hover:scale-110",
    rest: "transition hover:scale-110",
}

interface ColorTitleProps {
    title: string
    hex: string
    size: TailwindFontSizeType
    href?: string
}
function ColorTitle({ title, hex, size, href }: ColorTitleProps) {
    const titleLength = title.length

    const [focusNum, setFocusNum] = useState(titleLength + 1)
    const [tilte, setTilte] = useState<TiltType>("neutral")
    useEffect(() => {
        setFocusNum(getRandBetween(titleLength))
    }, [titleLength])

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
            default:
                return
        }
    }, [focusNum, titleLength])

    return (
        <Link passHref href={href ?? "/"}>
            <div
                className={`${tiltStyle[tilte]} ${size} py-4 truncate font-bold flex flex-row select-none transition active:scale-90`}
            >
                {title.split("").map((character, index) => {
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
                                onPointerEnter={() => setFocusNum(index)}
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
                            onPointerEnter={() => setFocusNum(index)}
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
