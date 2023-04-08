import { ThemeMode } from "@typing/theme"
import { useTheme } from "next-themes"

import useMounted from "@hooks/useMounted"
import { createVariants, WindVariants } from "tailwindest"
import { tw$ } from "@lib/wind"

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

const iconStyle = tw$("border")(
    {
        width: "w-6",
        height: "h-6",
        fontSize: "text-xs",
        fontWeight: "font-bold",
        "@dark": {
            ":hover": {
                backgroundColor: "dark:hover:bg-fuchsia-400",
            },
        },
    },
    {
        border: {
            border: "border-black border-solid",
            borderWidth: "border-[1.5px]",
        },
    }
)

const iconLayout = tw$("flexible")(
    {
        display: "flex",
        alignItems: "items-center",
        justifyContent: "justify-center",
    },
    {
        flexible: {
            flexDirection: "flex-row",
            gap: "gap-1.5",

            width: "w-fit",
            height: "h-6",

            paddingX: "px-1.5",
        },
    }
)

const iconBox = createVariants({
    style: iconStyle,
    layout: iconLayout,
})

interface IconBoxProps extends WindVariants<typeof iconBox> {
    hex: string
    children: React.ReactNode
}

function ColorBox({ hex, children, ...iconProps }: IconBoxProps) {
    const { themeHex } = useThemeHex(hex)
    const { isMounted } = useMounted()
    const style: React.CSSProperties =
        iconProps.style === "border"
            ? {
                  backgroundColor: themeHex,
                  borderColor: themeHex,
              }
            : {
                  backgroundColor: themeHex,
              }
    return (
        <div className={iconBox(iconProps)} style={isMounted ? style : {}}>
            {children}
        </div>
    )
}

export default ColorBox
