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
    borderTopRadius: "rounded-t-[1px]",

    borderWidth: "border",
    borderBottomWidth: "border-b-[0.2rem]",
    borderColor: "border-neutral-300",
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
        borderXWidth: "active:border-x",
        borderBottomWidth: "active:border-b",
        transformTranslateY: "active:translate-y-[0.1rem]",
    },
})

const util = {
    layout,
    border,
} as const

export { util }
