import { GetStaticProps } from "next"

import { PageType } from "@typing/page"

import { getProfileSource } from "@core/loader/profile"

import MDXBundler from "@components/MDXBundler"

import { config } from "blog.config"

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
            <MDXBundler source={profileSource} />
            <a href="https://github.com/danpa725/only-core">
                {config.copyright} Blog Core Battery 🔋
            </a>
        </>
    )
}
ProfilePage.displayName = "Profile" as PageType

export default ProfilePage
