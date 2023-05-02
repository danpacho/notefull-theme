import type { PageType } from "@typing/page"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { Nav } from "@components/_common"
import { NoteBackground } from "./NoteBackground"

import { config } from "blog.config"

import { tw } from "@lib/wind"
import { util } from "@styles/tailwind.util"

const useSetSystemTheme = () => {
    const { setTheme, systemTheme } = useTheme()
    useEffect(() => {
        systemTheme && setTheme(systemTheme)
    }, [systemTheme, setTheme])
}

const MainNav = () => (
    <Nav>
        {config.navigationMenu.map(({ name, path }) => (
            <Nav.Btn key={name} name={name} path={path} />
        ))}
    </Nav>
)

const layout = tw
    .style({
        display: "flex",
        flexDirection: "flex-col",
        justifyContent: "justify-center",
        alignItems: "items-center",
        padding: "p-5",
        paddingBottom: "pb-14",
        "@md": {
            padding: "md:p-8",
        },
        marginX: "mx-auto",
    })
    .compose(util.layout.style)

const layoutWrapper = tw.style({
    display: "flex",
    flexDirection: "flex-col",
    alignItems: "items-start",
    justifyContent: "justify-start",
    gap: "gap-4",

    width: "w-full",
    height: "h-full",
    minHeight: "min-h-screen",
})

const Layout = ({
    children,
    pageType,
}: {
    children: React.ReactNode
    pageType: PageType
}) => {
    useSetSystemTheme()

    return (
        <main className={layout.class}>
            <div className={layoutWrapper.class}>{children}</div>
            {pageType !== "Post" && <MainNav />}

            <NoteBackground {...config.noteBackgroundStyle} />
        </main>
    )
}

export default Layout
