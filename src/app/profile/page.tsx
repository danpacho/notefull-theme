import { config } from "blog.config"
import { MDXBundler } from "~/components/mdx/bundler"
import { Banner } from "~/components/common"
import { ProfileContacts, ProfileFooter } from "./components"
import { getProfileSource } from "~/core/loader/profile"

export const metadata = {
    title: "profile page",
    description: `Profile of ${config.author.name}.`,
}

export default async function ProfilePage() {
    const profileSource = await getProfileSource()

    return (
        <>
            <Banner
                title="Profile"
                description={config.subtitle}
                hex={config.themeColor}
            />
            <ProfileContacts
                hover="hover:fill-teal-500"
                hoverDark="dark:hover:fill-teal-300"
            />

            <MDXBundler source={profileSource} />

            <ProfileFooter />
        </>
    )
}
