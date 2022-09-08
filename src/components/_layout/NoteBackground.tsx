import tw from "@styles/tailwind.util"

import type {
    TailwindBgColorType,
    TailwindBgDarkColorType,
    TailwindStrokeColorType,
    TailwindStrokeDarkColorType,
} from "@typing/tailwind"

export interface NoteBackgroundProps {
    bgLight?: TailwindBgColorType
    bgDark?: TailwindBgDarkColorType
    rectWidth: number
    rectHeight: number
    rectStrokeLight?: TailwindStrokeColorType
    rectStrokeDark?: TailwindStrokeDarkColorType
    rectStrokeWidth?: number
    outerRectStrokeLight?: TailwindStrokeColorType
    outerRectStrokeDark?: TailwindStrokeDarkColorType
    outerRectStrokeWidth?: number
}
function NoteBackground({
    rectWidth,
    rectHeight,
    bgLight = "bg-transparent",
    bgDark = "dark:bg-neutral-900",
    rectStrokeWidth = 0.5,
    rectStrokeLight = "stroke-gray-300",
    rectStrokeDark = "dark:stroke-neutral-600",
    outerRectStrokeWidth = 0.75,
    outerRectStrokeLight = "stroke-gray-400",
    outerRectStrokeDark = "dark:stroke-gray-500",
}: NoteBackgroundProps) {
    return (
        <svg
            className={`${tw.layout} fixed top-0 -z-10 ${bgLight} ${bgDark}`}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="grid"
                    width={rectWidth}
                    height={rectHeight}
                    className={`${rectStrokeLight} ${rectStrokeDark}`}
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d={`M ${rectWidth} 0 L 0 0 0 ${rectHeight}`}
                        fill="none"
                        strokeWidth={rectStrokeWidth}
                    />
                </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#grid)"
                className={`${outerRectStrokeLight} ${outerRectStrokeDark}`}
                strokeWidth={outerRectStrokeWidth}
            />
        </svg>
    )
}

export default NoteBackground
