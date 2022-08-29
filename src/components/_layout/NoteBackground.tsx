import { TailwindStrokeColorType } from "@typing/tailwind"

interface NoteBackgroundProps {
    rectSize: number
    rectStrokeWidth?: number
    rectStrokeColor?: TailwindStrokeColorType
    outerRectStrokeWidth?: number
    outerRectStrokeColor?: TailwindStrokeColorType
}
function NoteBackground({
    rectSize,
    rectStrokeColor = "stroke-red-200",
    rectStrokeWidth = 0.5,
    outerRectStrokeColor = "stroke-gray-400",
    outerRectStrokeWidth = 0.75,
}: NoteBackgroundProps) {
    return (
        <svg
            className="fixed top-0 layout -z-10"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="grid"
                    width={`${rectSize}`}
                    height={`${rectSize}`}
                    patternUnits="userSpaceOnUse"
                    className={rectStrokeColor}
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
                className={outerRectStrokeColor}
                strokeWidth={outerRectStrokeWidth}
            />
        </svg>
    )
}

export default NoteBackground
