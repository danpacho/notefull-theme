import { wind } from "tailwindest"

const layout = wind({
    width: "w-full",
    minHeight: "min-h-screen",
    height: "h-max",
    "@md": {
        width: "md:w-3/4",
    },
    "@lg": {
        width: "lg:w-4/6",
    },
    "@xl": {
        width: "xl:w-3/5",
    },
    "@2xl": {
        width: "2xl:w-1/2",
    },
})

const border = wind({
    borderWidth: "border",
    "@dark": {
        borderColor: "dark:border-gray-500",
        ":hover": {
            borderColor: "dark:hover:border-gray-100",
        },
    },
    ":hover": {
        borderColor: "hover:border-black",
    },
})

const tw = {
    layout: layout.class(),
    layoutStyle: layout.style(),

    border: border.class(),
    borderStyle: border.style(),
} as const

export default tw
