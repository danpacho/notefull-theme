import { Tw } from "@lib/wind"

interface GirdProps {
    children: React.ReactNode
    col: Tw["gridTemplateColumns"]
    row?: Tw["gridTemplateRows"]
    mdCol?: `md:${Tw["gridTemplateColumns"]}`
    mdRow?: `md:${Tw["gridTemplateRows"]}`
    gap: Tw["gap"]
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
