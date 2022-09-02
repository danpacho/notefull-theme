import { useEffect, useState } from "react"
import Link from "next/link"

import ThemeBtn from "@components/ThemeBtn"

import { config } from "blog.config"

const useMounted = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return { isMounted }
}

const NavStyle = {
    layout: "fixed bottom-[-0.1px] flex flex-row items-start justify-center gap-2 md:gap-0 md:top-0 md:right-0 md:flex-col lg:right-[5%]",
    box: "w-full py-2 md:w-fit",
    bg: "bg-white dark:bg-neutral-900 md:dark:bg-transparent md:bg-transparent",
    text: "dark:text-gray-400 dark:hover:text-gray-500 text-gray-400 hover:text-black",
    border: "border-t border-t-gray-300 md:border-t-0",
} as const

const NavBtnStyle = {
    box: "py-1 mx-2 md:px-2 transition",
    border: "border-b border-b-transparent hover:border-b-black dark:hover:border-b-gray-100 md:border-l md:border-b-0 md:hover:border-l-black",
    text: "text-sm font-normal hover:text-black dark:hover:text-gray-100",
} as const

function Navigation() {
    const { isMounted } = useMounted()

    if (!isMounted) return <></>

    return (
        <nav
            className={`${NavStyle.layout} ${NavStyle.box} ${NavStyle.bg} ${NavStyle.border} ${NavStyle.text} z-0`}
        >
            {config.navigationMenu.map(({ name, path }) => {
                return (
                    <div
                        key={name}
                        className={`${NavBtnStyle.box} ${NavBtnStyle.border} ${NavBtnStyle.text}`}
                    >
                        <Link href={path}>{name}</Link>
                    </div>
                )
            })}
            <ThemeBtn
                styleClass={`${NavBtnStyle.box} ${NavBtnStyle.border} ${NavBtnStyle.text}`}
            />
        </nav>
    )
}

export default Navigation
