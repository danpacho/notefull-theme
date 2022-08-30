import { TailwindGridRowType, TailwindGridColType } from "@typing/tailwind"

interface GirdProps {
    children: React.ReactNode
    col: TailwindGridColType
    row?: TailwindGridRowType
    mdCol?: `md:${TailwindGridColType}`
    mdRow?: `md:${TailwindGridRowType}`
    gap: `gap-${"0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"}`
    styleClass?: string
}

function Grid({
    children,
    col,
    row,
    gap,
    mdCol,
    mdRow,
    styleClass,
}: GirdProps) {
    return (
        <div
            className={`grid w-full ${row} ${col} ${gap} ${mdRow} ${mdCol} ${styleClass}`}
        >
            {children}
        </div>
    )
}

export default Grid
