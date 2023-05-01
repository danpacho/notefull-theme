import type { TableOfContentsType } from "@lib/remark/getTableOfContents"

import { useTocAction, useTocValue } from "@components/TocProvider"
import { GetVariants } from "tailwindest"
import { tw } from "@lib/wind"

const linkBtn = tw.rotary({
    base: {
        width: "w-full",
        paddingLeft: "pl-2",
        transition: "transition",
    },
    h1: {
        paddingBottom: "pb-1",
        paddingY: "py-1",
        borderLeftWidth: "border-l",
        borderColor: "border-gray-300",
        "@dark": {
            borderColor: "dark:border-gray-400",
            ":hover": {
                borderColor: "dark:hover:border-transparent",
            },
        },
        ":hover": {
            borderColor: "hover:border-black",
        },
    },
    h2: { paddingLeft: "pl-2", paddingTop: "pt-0.5" },
})

const linkBtnText = tw.toggle({
    base: {
        width: "w-40",
        "@2xl": {
            width: "2xl:w-56",
        },
        transition: "transition",
        textOverflow: "truncate",
        fontSize: "text-sm",
        color: "text-gray-400",
        ":hover": {
            color: "hover:text-black",
        },
        "@dark": {
            ":hover": {
                color: "dark:hover:text-gray-100",
            },
        },
    },
    truthy: {
        fontWeight: "font-bold",
        color: "text-black",
        "@dark": {
            color: "dark:text-white",
        },
        transformTranslateX: "translate-x-1",
    },
    falsy: {},
})

const LinkBtn = ({
    title,
    href,
    type,
    isFocused,
    children,
}: {
    title: string
    href: string
    isFocused: boolean
    type: GetVariants<typeof linkBtn>
    children?: React.ReactNode
}) => {
    const { setActiveTitle } = useTocAction()
    const disableParentFocus = !children // disable click func of h2 parent
    return (
        <div
            className={`${linkBtn.class(type)} ${isFocused && "border-black"}`}
        >
            <a
                className="w-full"
                href={href}
                onClick={() => disableParentFocus && setActiveTitle(title)}
            >
                <p className={linkBtnText.class(isFocused)}>{title}</p>
            </a>
            {children}
        </div>
    )
}

const tocStyle = tw.style({
    position: "fixed",
    top: "top-0",
    left: "left-[5%]",

    flexDirection: "flex-col",
    justifyContent: "justify-center",
    alignItems: "items-start",
    gap: "gap-0",

    display: "hidden",
    "@xl": {
        display: "xl:flex",
    },

    width: "w-fit",
    height: "h-full",

    ":hover": {
        color: "hover:text-black",
        "@dark": {
            color: "hover:dark:text-gray-200",
        },
    },
})

interface PostTocProps {
    toc: TableOfContentsType[]
}
const PostToc = ({ toc }: PostTocProps) => {
    const { activeTitle } = useTocValue()

    return (
        <nav className={tocStyle.class}>
            {toc.map((tocDepth1) => {
                const { children } = tocDepth1
                return (
                    <LinkBtn
                        type="h1"
                        isFocused={activeTitle === tocDepth1.title}
                        key={tocDepth1.title}
                        {...tocDepth1}
                    >
                        {children?.map((tocDepth2) => (
                            <LinkBtn
                                type="h2"
                                isFocused={activeTitle === tocDepth2.title}
                                key={tocDepth2.title}
                                {...tocDepth2}
                            />
                        ))}
                    </LinkBtn>
                )
            })}
        </nav>
    )
}

export default PostToc
