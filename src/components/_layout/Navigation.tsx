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

const NavigationStyle =
    "py-1 mx-2 text-sm font-normal transition-all border-b border-b-transparent hover:border-b-black md:px-2 md:border-l md:hover:border-l-black md:hover:border-b-transparent hover:text-black dark:hover:text-gray-100"

function Navigation() {
    const { isMounted } = useMounted()

    if (!isMounted) return <></>

    return (
        <nav className="fixed bottom-[-0.1px] w-full flex flex-row items-start justify-center gap-2 py-2 bg-white dark:bg-neutral-900 md:dark:bg-transparent border-t -z-0 border-t-gray-300 md:w-fit md:bg-transparent md:border-t-0 dark:text-gray-400 dark:hover:text-gray-500 text-gray-400 hover:text-black md:fixed md:gap-0 md:top-0 lg:right-[5%] md:right-0 md:flex-col">
            {config.navigationMenu.map(({ name, path }) => {
                return (
                    <div key={name} className={NavigationStyle}>
                        <Link href={path}>{name}</Link>
                    </div>
                )
            })}
            <ThemeBtn styleClass={NavigationStyle} />
        </nav>
    )
}

export default Navigation
