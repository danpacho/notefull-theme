interface NoteBackgroundProps {
    innerRectRowNumber: number
    outereRectSize: number
}
function NoteBackground({
    outereRectSize,
    innerRectRowNumber,
}: NoteBackgroundProps) {
    return (
        <svg
            className="fixed top-0 w-full -z-10 md:w-3/4 lg:w-4/6"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id="smallGrid"
                    width={`${outereRectSize / innerRectRowNumber}`}
                    height={`${outereRectSize / innerRectRowNumber}`}
                    patternUnits="userSpaceOnUse"
                    className="stroke-red-200"
                >
                    <path
                        d={`M ${
                            outereRectSize / innerRectRowNumber
                        } 0 L 0 0 0 ${outereRectSize / innerRectRowNumber}`}
                        fill="none"
                        strokeWidth="0.5"
                    />
                </pattern>
            </defs>

            <rect
                width="100%"
                height="100%"
                fill="url(#smallGrid)"
                className="stroke-gray-400"
                strokeWidth={0.75}
            />
        </svg>
    )
}

export default NoteBackground
