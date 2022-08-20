import getAuthorContactHref, { ContactPlatformType } from "@core/contact"

const author = {
    name: "author name",
    currentState: "author current state",
    currentGoal: "author current goal",
    logoImageUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    bannerImageUrl: "/banner.png",
    contacts: {
        // ✅ DO NOT REMOVE EMAIL, for rss
        email: getAuthorContactHref("email", "your@email"),
        github: getAuthorContactHref("github", "githubID"),
        youtube: getAuthorContactHref("youtube", "youtubeID"),
        facebook: getAuthorContactHref("facebook", "facebookID"),
        instagram: getAuthorContactHref("instagram", "instagramID"),
        linkedin: getAuthorContactHref("linkedin", "linkedinID"),
        twitter: getAuthorContactHref("twitter", "twitterID"),
    } as { [key in ContactPlatformType]?: string },
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
    postPerCategoryPage: 4,
    numberOfLatestPost: 5,
    numberOfMainPageCategory: 5,
    postControllerText: {
        first: (category: string) => `Return to ${category}`, // first post ➡️ no prev post, so replace with your text
        last: (category: string) => `Last post of ${category}`, // last post ➡️ no next post, so replace with your text
    },
    author,
    ...blog,
} as const

export type BlogInfoType = typeof blog
export type AuthorInfoType = typeof author
export type ConfigType = typeof config

export { config }
