import { ThemeMode } from "@typing/theme"
import { useTheme } from "next-themes"

import useMounted from "@hooks/useMounted"

const useThemeHex = (hex: string) => {
    const theme = useTheme().theme as ThemeMode
    const themeHex =
        theme === "light"
            ? `${hex}${HEX_OPACITY_OPTION.light}`
            : `${hex}${HEX_OPACITY_OPTION.dark}`
    return { themeHex }
}

const HEX_OPACITY_OPTION = {
    dark: "59",
    light: "40",
} as const

const COMMON_STYLE = {
    size: "w-6 h-6",
    stroke: "border-[1.5px]",
    bgStylesheet: (hex: string) => ({
        backgroundColor: hex,
    }),
    borderStylesheet: (hex: string) => ({
        borderColor: hex,
    }),
    bgBorderStylesheet: (hex: string) => ({
        backgroundColor: hex,
        borderColor: hex,
    }),
} as const

const IconVarients = {
    bg: {
        class: COMMON_STYLE.size,
        style: COMMON_STYLE.bgStylesheet,
    },
    border: {
        class: `${COMMON_STYLE.size} ${COMMON_STYLE.stroke}`,
        style: COMMON_STYLE.borderStylesheet,
    },
    ["bg-border"]: {
        class: `${COMMON_STYLE.size} ${COMMON_STYLE.stroke}`,
        style: COMMON_STYLE.bgBorderStylesheet,
    },
    ["double-bg-border"]: {
        class: `flex-row px-1.5 w-fit h-6 gap-1.5 ${COMMON_STYLE.stroke}`,
        style: COMMON_STYLE.bgBorderStylesheet,
    },
} as const
type IconVarientsType = keyof typeof IconVarients

interface IconBoxProps {
    hex: string
    children: React.ReactNode
    varients?: IconVarientsType
}

function ColorBox({ hex, children, varients = "bg" }: IconBoxProps) {
    const { themeHex } = useThemeHex(hex)
    const { isMounted } = useMounted()
    return (
        <div
            className={`${IconVarients[varients].class} flex items-center justify-center text-xs font-bold`}
            style={isMounted ? IconVarients[varients].style(themeHex) : {}}
        >
            {children}
        </div>
    )
}

export default ColorBox
