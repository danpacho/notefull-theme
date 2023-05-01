import { NoteBackgroundProps } from "@components/_layout/NoteBackground"
import type { ContactPlatformType } from "@core/contact"
import getAuthorContactHref from "@core/contact"

const contacts: Readonly<
    {
        [key in Exclude<ContactPlatformType, "email">]?: string
    } & {
        email: string // ✅ email for RSS
    }
> = {
    email: getAuthorContactHref("email", "your_email"),
    github: getAuthorContactHref("github", "github_id"),
    youtube: getAuthorContactHref("youtube", "youtube_id"),
    facebook: getAuthorContactHref("facebook", "facebook_id"),
    linkedin: getAuthorContactHref("linkedin", "linkedin_id"),
    twitter: getAuthorContactHref("twitter", "twitter_id"),
}

const author = {
    name: "your name",
    introduce: "Introduce yourself",
    faviconUrl: "/favicon.ico",
    bannerImageUrl: "/banner.png",
    contacts,
} as const

const blog = {
    url: "your DEPLOY URL",
    siteName: "your site name",
    subtitle: "your site subtitle",
    copyright: `${
        author.name
    }© All rights reserved ${new Date().getFullYear()}.`,
    language: "ko",
    googleAnalyticsID: "DISABLED", // default to "DISABLED"
} as const

const config = {
    blogContentsDirectoryName: "blog", // blog contents directory name
    useKatex: false, // katex option
    postPerCategoryPage: 8,
    numberOfLatestPost: 4,
    numberOfMainPageCategory: 5,

    themeColor: "#73d1d7",

    postControllerText: {
        first: (category: string) => `Return to ${category}`, // first post ➡️ no prev post, so replace with your text
        last: (category: string) => `Last contents of ${category}`, // last post ➡️ no next post, so replace with your text
    },

    navigationMenu: [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Category",
            path: "/category",
        },
        {
            name: "Profile",
            path: "/profile",
        },
    ],

    noteBackgroundStyle: {
        rectWidth: 300,
        rectHeight: 200,
        outerRectStrokeWidth: 1.5,
        rectStrokeWidth: 1,
        outerRectStrokeLight: "stroke-gray-300",
        outerRectStrokeDark: "dark:stroke-neutral-700",
        rectStrokeDark: "dark:stroke-teal-700/50",
        bgDark: "dark:bg-neutral-900",
    } as NoteBackgroundProps,

    author,
    ...blog,
} as const

export type BlogInfoType = typeof blog
export type AuthorInfoType = typeof author
export type ConfigType = typeof config

export { config }
