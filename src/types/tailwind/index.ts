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

export type TailwindFontSizeType = `text-${TailwindSizeVarients}`

export type TailwindStrokeColorType =
    | `stroke-${TailwindColorVarients}-${TailwindColorAccent}`
    | `stroke-${TailwindColorWithNoVarients}`
export type TailwindBgColorType =
    | `bg-${TailwindColorVarients}-${TailwindColorAccent}`
    | `bg-${TailwindColorWithNoVarients}`
export type TailwindBorderColorType =
    | `border-${TailwindColorVarients}-${TailwindColorAccent}`
    | `border-${TailwindColorWithNoVarients}`
export type TailwindDividerColorType =
    | `divide-${TailwindColorVarients}-${TailwindColorAccent}`
    | `divide-${TailwindColorWithNoVarients}`
export type TailwindTextColorType =
    | `text-${TailwindColorVarients}-${TailwindColorAccent}`
    | `text-${TailwindColorWithNoVarients}`