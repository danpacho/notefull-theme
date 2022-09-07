import "../styles/tailwind.css"

import { useEffect, useRef } from "react"

import { ThemeProvider } from "next-themes"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Head from "next/head"

import type { PageType } from "@typing/page"

import Layout from "@components/_layout"
import { TocProvider } from "@components/TocProvider"
import { DefaultSEO } from "@components/SEO"
import { GoogleAnalytics } from "@components/GoogleAnalytics"

import { config } from "blog.config"

/**
 * - custom hook for restoring scroll position
 * - restore forward-backward navagation
 */
const useRestorePageScroll = () => {
    const router = useRouter()

    const savedScrollPosition = useRef(0)
    const isURLBackwardByRouter = useRef(false)

    useEffect(() => {
        const beforeHistoryChange = () => {
            savedScrollPosition.current = window.scrollY
        }

        const routeChangeComplete = () => {
            isURLBackwardByRouter.current &&
                window.scrollTo({
                    top: savedScrollPosition.current,
                    behavior: "auto",
                })
            isURLBackwardByRouter.current = false
        }

        router.beforePopState(() => {
            isURLBackwardByRouter.current = true
            return true
        })

        router.events.on("routeChangeComplete", routeChangeComplete)
        router.events.on("beforeHistoryChange", beforeHistoryChange)

        return () => {
            router.events.off("routeChangeComplete", routeChangeComplete)
            router.events.off("beforeHistoryChange", beforeHistoryChange)
        }
    }, [router])
}

function App({ Component, pageProps }: AppProps) {
    // distinguish page, set diffrent style or layout for each pages
    const pageType = Component?.displayName as PageType

    useRestorePageScroll()

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            {config.googleAnalyticsID !== "DISABLED" && (
                <GoogleAnalytics googleAnalyticsID={config.googleAnalyticsID} />
            )}

            <DefaultSEO />

            <ThemeProvider
                attribute="class"
                enableSystem
                disableTransitionOnChange
            >
                <Layout pageType={pageType}>
                    <TocProvider>
                        <Component {...pageProps} />
                    </TocProvider>
                </Layout>
            </ThemeProvider>
        </>
    )
}

export default App
