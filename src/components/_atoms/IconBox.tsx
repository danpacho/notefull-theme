interface IconBoxProps {
    hex: string
    children: React.ReactNode
}
const IconBox = ({ hex, children }: IconBoxProps) => {
    const opacityColor = `${hex}7d`
    return (
        <div
            className={`flex items-center justify-center w-6 h-6 rounded-sm text-xs font-bold`}
            style={{ backgroundColor: opacityColor }}
        >
            {children}
        </div>
    )
}

export default IconBox
