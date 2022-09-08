import { GetStaticProps } from "next"

import type { PageType } from "@typing/page"

import { getProfileSource } from "@core/loader/profile"

import MDXBundler from "@components/MDX/Bundler"
import { Banner } from "@components/_common"
import { ProfileContacts, ProfileFooter } from "@components/_pages/profile"

import { config } from "blog.config"

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
    const profileSource = await getProfileSource()
    return {
        props: {
            profileSource,
        },
    }
}
interface ProfileProps {
    profileSource: string
}
function ProfilePage({ profileSource }: ProfileProps) {
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
ProfilePage.displayName = "Profile" as PageType

export default ProfilePage
