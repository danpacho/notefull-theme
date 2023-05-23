"use client"

import { PropsWithChildren, useEffect } from "react"
import { PostNav } from "./components"
import { MAIN_NAV_ID } from "~/components/common"

export default function PostLayout({
    children,
    params: { category },
}: PropsWithChildren<{
    params: { category: string }
}>) {
    // hide main navigation at post page
    useEffect(() => {
        const mainNav = document.getElementById(MAIN_NAV_ID)
        mainNav?.classList.add("hidden")

        return () => {
            mainNav?.classList.remove("hidden")
        }
    }, [])

    return (
        <>
            {children}
            <PostNav category={category} />
        </>
    )
}
