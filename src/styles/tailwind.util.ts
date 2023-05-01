import { tw } from "@lib/wind"

const layout = tw.style({
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

const border = tw.style({
    transition: "transition-all ease-out",
    transitionDuration: "duration-75",

    borderBottomRadius: "rounded-b-md",

    borderWidth: "border",
    borderBottomWidth: "border-b-[0.2rem]",
    "@dark": {
        borderColor: "dark:border-neutral-500",
        ":hover": {
            borderColor: "dark:hover:border-neutral-400",
        },
    },
    ":hover": {
        borderColor: "hover:border-neutral-900",
    },
    ":active": {
        borderBottomWidth: "active:border-b",
        borderLeftWidth: "active:border-l",
        borderRightWidth: "active:border-r",
        transformTranslateY: "active:translate-y-[0.1rem]",
    },
})

const util = {
    layout,
    border,
} as const

export { util }
