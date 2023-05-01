import { ThemeMode } from "@typing/theme"
import { useTheme } from "next-themes"

import { useMounted } from "@hooks/useMounted"
import { GetVariants } from "tailwindest"
import { tw } from "@lib/wind"

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

const iconBox = tw.variants({
    base: {
        display: "flex",
        alignItems: "items-center",
        justifyContent: "justify-center",

        fontSize: "text-xs",
        fontWeight: "font-bold",
        "@dark": {
            ":hover": {
                backgroundColor: "dark:hover:bg-fuchsia-400",
            },
        },
    },
    variants: {
        style: {
            border: {
                borderColor: "border-black",
                borderWidth: "border-[1.25px]",
            },
            noBorder: {
                borderColor: "border-transparent",
                borderWidth: "border-0",
            },
        },
        layout: {
            flex: {
                flexDirection: "flex-row",
                gap: "gap-1.5",

                width: "w-fit",
                height: "h-6",

                paddingX: "px-1.5",
            },
            square: {
                width: "w-6",
                height: "h-6",
                minWidth: "min-w-[1.5rem]",
                minHeight: "min-h-[1.5rem]",
                maxWidth: "max-w-[1.5rem]",
                maxHeight: "max-h-[1.5rem]",
                borderRadius: "rounded-[1px]",
            },
        },
    },
})

interface IconBoxProps extends GetVariants<typeof iconBox> {
    hex: string
    children: React.ReactNode
}

const ColorBox = ({
    hex,
    children,
    layout = "square",
    style = "noBorder",
}: IconBoxProps) => {
    const { themeHex } = useThemeHex(hex)
    const { isMounted } = useMounted()
    const boxColor: React.CSSProperties =
        style === "border"
            ? {
                  backgroundColor: themeHex,
                  borderColor: themeHex,
              }
            : {
                  backgroundColor: themeHex,
              }
    return (
        <div
            className={iconBox.class({ layout, style })}
            style={isMounted ? boxColor : {}}
        >
            {children}
        </div>
    )
}

export default ColorBox
