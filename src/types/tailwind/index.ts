type TailwindColorVarients =
    | "slate"
    | "gray"
    | "neutral"
    | "stone"
    | "red"
    | "orange"
    | "yellow"
    | "lime"
    | "amber"
    | "green"
    | "teal"
    | "blue"
    | "indigo"
    | "sky"
    | "cyan"
    | "emerald"
    | "violet"
    | "fuchsia"
    | "pink"
    | "rose"
    | "purple"

type TailwindColorWithNoVarients =
    | "inherit"
    | "current"
    | "transparent"
    | "black"
    | "white"

type TailwindColorAccent =
    | "50"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"

type TailwindSizeVarients =
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"

type TailwindGridNumberType = "1" | "2" | "3" | "4" | "5" | "6" | "none"

type TailwindFontWeightVarients =
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black"

export type TailwindGridRowType = `grid-rows-${TailwindGridNumberType}`
export type TailwindGridColType = `grid-cols-${TailwindGridNumberType}`

export type TailwindFontSizeType = `text-${TailwindSizeVarients}`
export type TailwindFontColorType =
    | `text-${TailwindColorVarients}-${TailwindColorAccent}`
    | `text-${TailwindColorWithNoVarients}`
export type TailwindFontWeightType = `font-${TailwindFontWeightVarients}`
export type TailwindStrokeColorType =
    | `stroke-${TailwindColorVarients}-${TailwindColorAccent}`
    | `stroke-${TailwindColorWithNoVarients}`
export type TailwindStrokeDarkColorType =
    | `dark:stroke-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:stroke-${TailwindColorWithNoVarients}`
export type TailwindFillColorType =
    | `fill-${TailwindColorVarients}-${TailwindColorAccent}`
    | `fill-${TailwindColorWithNoVarients}`
export type TailwindFillDarkColorType =
    | `dark:fill-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:fill-${TailwindColorWithNoVarients}`

export type TailwindBgColorType =
    | `bg-${TailwindColorVarients}-${TailwindColorAccent}`
    | `bg-${TailwindColorWithNoVarients}`
export type TailwindBgDarkColorType =
    | `dark:bg-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:bg-${TailwindColorWithNoVarients}`

export type TailwindBorderColorType =
    | `border-${TailwindColorVarients}-${TailwindColorAccent}`
    | `border-${TailwindColorWithNoVarients}`
export type TailwindBorderDarkColorType =
    | `dark:border-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:border-${TailwindColorWithNoVarients}`

export type TailwindDividerColorType =
    | `divide-${TailwindColorVarients}-${TailwindColorAccent}`
    | `divide-${TailwindColorWithNoVarients}`
export type TailwindDividerDarkColorType =
    | `dark:divide-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:divide-${TailwindColorWithNoVarients}`

export type TailwindTextColorType =
    | `text-${TailwindColorVarients}-${TailwindColorAccent}`
    | `text-${TailwindColorWithNoVarients}`
export type TailwindTextDarkColorType =
    | `dark:text-${TailwindColorVarients}-${TailwindColorAccent}`
    | `dark:text-${TailwindColorWithNoVarients}`
