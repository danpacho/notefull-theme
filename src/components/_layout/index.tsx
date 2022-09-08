import type { PageType } from "@typing/page"

import tw from "@styles/tailwind.util"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { Nav } from "@components/_common"
import NoteBackground from "./NoteBackground"

import { config } from "blog.config"

const useSetSystemTheme = () => {
    const { setTheme, systemTheme } = useTheme()
    useEffect(() => {
        systemTheme && setTheme(systemTheme)
    }, [systemTheme, setTheme])
}

const MainNav = () => (
    <Nav.Container>
        {config.navigationMenu.map(({ name, path }) => (
            <Nav.Btn key={name} name={name} path={path} />
        ))}
    </Nav.Container>
)

function Layout({
    children,
    pageType,
}: {
    children: React.ReactNode
    pageType: PageType
}) {
    useSetSystemTheme()

    return (
        <main
            className={`${tw.layout} flex flex-col items-center justify-center p-5 pb-14 md:p-8 mx-auto`}
        >
            <div className="flex flex-col items-start justify-start w-full h-full min-h-screen gap-4">
                {children}
            </div>
            {pageType !== "Post" && <MainNav />}

            <NoteBackground {...config.noteStyle} />
        </main>
    )
}

export default Layout
