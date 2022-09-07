import { GetStaticProps } from "next"

import { PageType } from "@typing/page"

import { getProfileSource } from "@core/loader/profile"

import MDXBundler from "@components/MDX/Bundler"

import { config } from "blog.config"

import { Banner } from "@components/_common"

export const getStaticProps: GetStaticProps<ProfileProps> = async () => {
    const profileSource = await getProfileSource()
    return {
        props: {
            profileSource,
        },
    }
}

const Logo = ({ width, height }: { width: number; height: number }) => {
    const [alt, fileType] = config.author.logoImageUrl.split(".")
    return (
        <picture>
            <source
                srcSet={config.author.logoImageUrl}
                type={`image/${fileType}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element*/}
            <img
                src={config.author.logoImageUrl}
                width={width}
                height={height}
                alt={alt}
                loading="lazy"
                decoding="async"
            />
        </picture>
    )
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
            <MDXBundler source={profileSource} />
            <a href="https://github.com/danpa725/bloapi">
                {config.copyright}, Powered by Bloapi 🐧
            </a>
        </>
    )
}
ProfilePage.displayName = "Profile" as PageType

export default ProfilePage
