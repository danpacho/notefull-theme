import type { TableOfContentsType } from "@lib/remark/getTableOfContents"

import { useTocAction, useTocValue } from "@components/TocProvider"

const LinkBtnStyle = {
    h1: "pb-1 py-1 border-l border-gray-300 dark:border-gray-400 hover:border-black dark:hover:border-transparent",
    h2: "pl-2 pt-0.5",
} as const
type LinkBtnType = keyof typeof LinkBtnStyle

const focusedStyle =
    "font-bold text-black dark:text-white translate-x-1" as const
const LinkBtn = ({
    title,
    href,
    type,
    isFoucused,
    children,
}: {
    title: string
    href: string
    isFoucused: boolean
    type: LinkBtnType
    children?: React.ReactNode
}) => {
    const { setActiveTitle } = useTocAction()
    const disableParentFocus = !children // disable click func of h2 parent
    return (
        <div
            className={`
            ${LinkBtnStyle[type]} 
            ${isFoucused && "border-black"} 
            pl-2 transition w-full`}
        >
            <a
                className="w-full"
                href={href}
                onClick={() => disableParentFocus && setActiveTitle(title)}
            >
                <p
                    className={`
                    ${isFoucused && focusedStyle} 
                    transition w-40 2xl:w-56
                    truncate text-sm 
                    text-gray-400 hover:text-black dark:hover:text-gray-100
                    `}
                >
                    {title}
                </p>
            </a>
            {children}
        </div>
    )
}

const TocStyle = {
    position: "fixed top-0 left-[5%]",
    layout: "hidden xl:flex flex-col justify-center items-start gap-0",
    box: "h-full w-fit max-h",
    text: "hover:text-black dark:hover:text-gray-200",
} as const
interface PostTocProps {
    toc: TableOfContentsType[]
}
function PostToc({ toc }: PostTocProps) {
    const { activeTitle } = useTocValue()
    return (
        <nav
            className={`${TocStyle.position} ${TocStyle.layout} ${TocStyle.box} ${TocStyle.text}`}
        >
            {toc.map((tocDepth1) => {
                const { children } = tocDepth1
                return (
                    <LinkBtn
                        type="h1"
                        isFoucused={activeTitle === tocDepth1.title}
                        key={tocDepth1.title}
                        {...tocDepth1}
                    >
                        {children?.map((tocDepth2) => (
                            <LinkBtn
                                type="h2"
                                isFoucused={activeTitle === tocDepth2.title}
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
