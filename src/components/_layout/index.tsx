import type { PageType } from "@typing/page"

import tw from "@styles/tailwind.util"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { Nav } from "@components/_common"
import NoteBackground from "./NoteBackground"

import { config } from "blog.config"
import { wind } from "tailwindest"

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

const layout = wind({
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
    .compose(tw.layoutStyle)
    .class()

const layoutWrapper = wind({
    display: "flex",
    flexDirection: "flex-col",
    alignItems: "items-start",
    justifyContent: "justify-start",
    gap: "gap-4",

    width: "w-full",
    height: "h-full",
    minHeight: "min-h-screen",
}).class()

const Layout = ({
    children,
    pageType,
}: {
    children: React.ReactNode
    pageType: PageType
}) => {
    useSetSystemTheme()

    return (
        <main className={layout}>
            <div className={layoutWrapper}>{children}</div>
            {pageType !== "Post" && <MainNav />}

            <NoteBackground {...config.noteBackgroundStyle} />
        </main>
    )
}

export default Layout
