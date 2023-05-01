import { createTools, Tailwindest } from "tailwindest"

export type TailwindCustom = Tailwindest<
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
export type Tailwind = Required<TailwindCustom>
export const tw = createTools<TailwindCustom>()
