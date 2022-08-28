const RowBetween = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-row items-center justify-between w-full">
            {children}
        </div>
    )
}

export default RowBetween
