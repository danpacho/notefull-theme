import { Tailwind } from "@lib/wind"

interface GirdProps {
    children: React.ReactNode
    col: Tailwind["gridTemplateColumns"]
    row?: Tailwind["gridTemplateRows"]
    mdCol?: `md:${Tailwind["gridTemplateColumns"]}`
    mdRow?: `md:${Tailwind["gridTemplateRows"]}`
    gap: Tailwind["gap"]
    styleClass?: string
}

const Grid = ({
    children,
    col,
    row,
    gap,
    mdCol,
    mdRow,
    styleClass,
}: GirdProps) => (
    <div
        className={`grid w-full ${row} ${col} ${gap} ${mdRow} ${mdCol} ${styleClass}`}
    >
        {children}
    </div>
)

export default Grid
