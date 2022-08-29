import {
    TailwindBgColorType,
    TailwindBgDarkColorType,
    TailwindStrokeColorType,
    TailwindStrokeDarkColorType,
} from "@typing/tailwind"

interface NoteBackgroundProps {
    bgLight?: TailwindBgColorType
    bgDark?: TailwindBgDarkColorType
    rectSize: number
    rectStrokeLight?: TailwindStrokeColorType
    rectStrokeDark?: TailwindStrokeDarkColorType
    rectStrokeWidth?: number
    outerRectStrokeLight?: TailwindStrokeColorType
    outerRectStrokeDark?: TailwindStrokeDarkColorType
    outerRectStrokeWidth?: number
}
function NoteBackground({
    bgLight = "bg-transparent",
    bgDark = "dark:bg-neutral-900",
    rectSize,
    rectStrokeWidth = 0.5,
    rectStrokeLight = "stroke-gray-300",
    rectStrokeDark = "dark:stroke-neutral-600",
    outerRectStrokeWidth = 0.75,
    outerRectStrokeLight = "stroke-gray-400",
    outerRectStrokeDark = "dark:stroke-gray-500",
}: NoteBackgroundProps) {
    return (
        <svg
            className={`fixed top-0 layout -z-10 ${bgLight} ${bgDark}`}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="grid"
                    width={rectSize}
                    height={rectSize}
                    className={`${rectStrokeLight} ${rectStrokeDark}`}
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d={`M ${rectSize} 0 L 0 0 0 ${rectSize}`}
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
