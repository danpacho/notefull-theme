import "../styles/tailwind.css"
import { config } from "blog.config"
import { type PropsWithChildren } from "react"
import { MainNav } from "~/components/common"
import ClientLayout from "~/components/layout"
import { NoteBackground } from "~/components/layout/NoteBackground"
import { tw } from "~/styles/tailwind"
import { util } from "~/styles/tailwind.util"

export const metadata = {
    viewport: {
        width: "device-width",
        initialScale: 1,
    },

    authors: {
        name: config.author.name,
        url: config.url,
    },
    applicationName: config.siteName,
    title: config.siteName,
    description: config.subtitle,
    publisher: config.author.name,
    creator: config.author.name,
    themeColor: config.themeColor,
    generator: "Next.js",
    keywords: ["blog", "dev", "log"],
    robots: "index, follow",

    other: config.author.contacts,

    metadataBase: new URL(config.url),
    openGraph: {
        title: `Welcome to ${config.siteName}!`,
        description: config.author.introduce,
        siteName: config.siteName,
        url: config.url,
        images: config.author.bannerImageUrl,
        emails: config.author.contacts.email,
        countryName: "South Korea",
        locale: "ko",
        type: "website",
    },
    twitter: {
        creator: config.author.name,
        images: config.author.bannerImageUrl,
        title: config.siteName,
        site: config.url,
        card: "summary_large_image",
        description: config.subtitle,
    },
}

const mainLayout = tw
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

const mainContentLayout = tw.style({
    display: "flex",
    flexDirection: "flex-col",
    alignItems: "items-start",
    justifyContent: "justify-start",
    gap: "gap-4",

    width: "w-full",
    height: "h-full",
    minHeight: "min-h-screen",
})

export default function RootLayout(props: PropsWithChildren) {
    return (
        <html suppressHydrationWarning>
            <body className={mainLayout.class}>
                <ClientLayout>
                    <main className={mainContentLayout.class}>
                        {props.children}
                    </main>

                    <NoteBackground {...config.noteBackgroundStyle} />

                    <MainNav />
                </ClientLayout>
            </body>
        </html>
    )
}
