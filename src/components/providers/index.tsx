"use client"

import { ThemeProvider } from "next-themes"
import { TocProvider } from "./TocProvider"

export const Providers = ({ children }: React.PropsWithChildren) => {
    return (
        <ThemeProvider attribute="class">
            <TocProvider>{children}</TocProvider>
        </ThemeProvider>
    )
}
