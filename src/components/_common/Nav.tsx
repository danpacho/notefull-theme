import type { PropsWithChildren } from "react"
import Link from "next/link"

import ThemeBtn from "@components/ThemeBtn"

const NavStyle = {
    layout: "fixed bottom-[-0.1px] left-0 flex flex-row items-start justify-center gap-2 md:left-[unset] md:gap-0 md:top-0 md:right-0 md:flex-col lg:right-[5%] xl:right-[11%]",
    box: "w-full py-2 md:w-fit",
    border: "border-t border-t-gray-300 md:border-t-0",
    bg: "bg-white dark:bg-neutral-900 md:dark:bg-transparent md:bg-transparent",
    text: "text-gray-400 hover:text-black dark:hover:text-gray-300 ",
} as const

const NavBtnStyle = {
    box: "py-1 mx-2 md:px-2 transition",
    border: "border-b border-b-transparent hover:border-b-black dark:hover:border-b-gray-100 md:border-b-0 md:border-l border-l-gray-300 md:dark:border-l-gray-400 md:hover:border-l-black md:dark:hover:border-l-transparent",
    text: "text-sm font-normal hover:text-black dark:hover:text-gray-100",
} as const

const Nav = ({ children }: PropsWithChildren<React.ReactNode>) => {
    return (
        <nav
            className={`${NavStyle.layout} ${NavStyle.box} ${NavStyle.bg} ${NavStyle.border} ${NavStyle.text} z-0`}
        >
            {children}
            <ThemeBtn
                styleClass={`${NavBtnStyle.box} ${NavBtnStyle.border} ${NavBtnStyle.text}`}
            />
        </nav>
    )
}
const Btn = ({ path, name }: { path: string; name: string }) => {
    return (
        <Link href={path}>
            <button
                type="button"
                className={`${NavBtnStyle.box} ${NavBtnStyle.border} ${NavBtnStyle.text}`}
                aria-label={`Link to ${name}`}
            >
                {name}
            </button>
        </Link>
    )
}

Nav.Btn = Btn

export default Nav
