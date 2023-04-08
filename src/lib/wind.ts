import { createWind, Tailwindest } from "tailwindest"

type Tw = Tailwindest<
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

const { wind: tw, wind$: tw$ } = createWind<Tw>()

export { tw, tw$, type Tw }
