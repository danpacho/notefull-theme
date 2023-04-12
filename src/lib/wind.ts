import { createWind, Tailwindest } from "tailwindest"

type TailwindCustom = Tailwindest<
    {},
    {
        listStyleType:
            | "none"
            | "disc"
            | "circle"
            | "square"
            | "decimal"
            | "upper-roman"
            | "lower-alpha"
            | "upper-alpha"
    }
>

type Tailwind = Required<TailwindCustom>

const {
    wind: tw,
    wind$: tw$,
    mergeProps,
    toggle,
} = createWind<TailwindCustom>()

export { tw, tw$, type Tailwind, mergeProps, toggle }
