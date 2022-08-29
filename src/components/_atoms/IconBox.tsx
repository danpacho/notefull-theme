import { useTheme } from "next-themes"

import { ThemeMode } from "@typing/theme"
import { useEffect, useState } from "react"

const HEX_OPACITY = {
    dark: "BF", // 75%
    light: "80", // 50%
}

interface IconBoxProps {
    hex: string
    children: React.ReactNode
}
function IconBox({ hex, children }: IconBoxProps) {
    const theme = useTheme().theme as ThemeMode
    const [color, setColor] = useState("")
    useEffect(() => {
        const opacityColor =
            theme === "light"
                ? `${hex}${HEX_OPACITY.light}`
                : `${hex}${HEX_OPACITY.dark}`
        setColor(opacityColor)
    }, [theme, hex])

    return (
        <div
            className={`flex items-center justify-center w-6 h-6 rounded-sm text-xs font-bold`}
            style={{ backgroundColor: color }}
        >
            {children}
        </div>
    )
}

export default IconBox
