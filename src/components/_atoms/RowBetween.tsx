function RowBetween({
    children,
    onClick,
    styleClass,
}: {
    children: React.ReactNode
    styleClass?: string
    onClick?: () => void
}) {
    return (
        <div
            className={`${styleClass} flex flex-row items-center justify-between w-full`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default RowBetween
