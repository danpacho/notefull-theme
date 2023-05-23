"use client"

import { useEffect } from "react"
import { useTheme } from "next-themes"

import { Providers } from "~/components/providers"
import { Nav } from "~/components/common"
import { config } from "blog.config"

const useSetSystemTheme = () => {
    const { setTheme, systemTheme } = useTheme()
    useEffect(() => {
        systemTheme && setTheme(systemTheme)
    }, [systemTheme, setTheme])
}

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    useSetSystemTheme()

    return <Providers>{children}</Providers>
}

export default ClientLayout
