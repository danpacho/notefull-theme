function RowBetween({
    children,
    onClick,
}: {
    children: React.ReactNode
    onClick?: () => void
}) {
    return (
        <div
            className="flex flex-row items-center justify-between w-full"
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default RowBetween
