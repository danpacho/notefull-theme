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

    borderBottomRadius: "rounded-b-[2px]",
    borderTopRadius: "rounded-t-[1px]",

    borderWidth: "border",
    borderBottomWidth: "border-b-[0.175rem]",
    borderColor: "border-gray-300",
    "@dark": {
        borderColor: "dark:border-neutral-600",
        ":hover": {
            borderColor: "dark:hover:border-neutral-400",
        },
    },
    ":hover": {
        borderColor: "hover:border-neutral-900",
    },
    ":active": {
        borderBottomWidth: "active:border-b",
        transformTranslateY: "active:translate-y-[0.075rem]",
    },
})

const fullWidth = tw.style({
    width: "w-[calc(100%+2.5rem)]",
    marginLeft: "ml-[-1.25rem]",
    "@md": {
        width: "md:w-[calc(100%+4rem)]",
        marginLeft: "md:ml-[-2rem]",
    },
})

const util = {
    layout,
    border,
    fullWidth,
} as const

export { util }
