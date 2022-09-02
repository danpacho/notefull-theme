import { PageType } from "@typing/page"

import tw from "@styles/tailwind.util"

import { Nav } from "@components/_common/index"

import NoteBackground from "./NoteBackground"

import { config } from "blog.config"

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
    return (
        <main
            className={`${tw.layout} flex flex-col items-center justify-center p-8 mx-auto`}
        >
            <div className="flex flex-col items-start justify-start w-full h-full min-h-screen gap-4">
                {children}
            </div>
            {pageType !== "Post" && <MainNav />}

            <NoteBackground rectWidth={150} rectHeight={150} />
        </main>
    )
}

export default Layout
