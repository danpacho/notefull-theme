import type { TailwindFillColorType } from "@typing/tailwind"

import {
    Facebook,
    Github,
    Linkedin,
    Mail,
    Twitter,
    Youtube,
} from "@components/_icons"
import { ColorBox } from "@components/_atoms"

import { config } from "blog.config"

const { contacts } = config.author
const contactArr = Object.entries(contacts)

interface IconFillColor {
    hover: `hover:${TailwindFillColorType}`
    hoverDark: `dark:hover:${TailwindFillColorType}`
}
const CONTACT_ICON = (
    size: { width: string; height: string },
    fill: IconFillColor = {
        hover: "hover:fill-neutral-300",
        hoverDark: "dark:hover:fill-neutral-600",
    }
): {
    [key in keyof typeof config.author.contacts]: React.ReactNode
} => {
    const style = `fill-dark dark:fill-white ${fill.hover} ${fill.hoverDark} transition`
    const { width, height } = size
    return {
        email: <Mail width={width} height={height} className={style} />,
        github: <Github width={width} height={height} className={style} />,
        youtube: <Youtube width={width} height={height} className={style} />,
        twitter: <Twitter width={width} height={height} className={style} />,
        facebook: <Facebook width={width} height={height} className={style} />,
        linkedin: <Linkedin width={width} height={height} className={style} />,
    }
}
interface ContactsLinkProps extends IconFillColor {
    iconWidth?: number
    iconHeight?: number
}
const ProfileContacts = ({
    iconWidth = 0.75,
    iconHeight = 0.75,
    hover,
    hoverDark,
}: ContactsLinkProps) => {
    return (
        <div className="flex flex-row flex-wrap items-center justify-start gap-2 mt-6 mb-4">
            {contactArr.map((contact) => {
                const platform = contact[0] as keyof typeof contacts
                const contactInfo = contact[1]

                return (
                    <a href={contactInfo} key={contactInfo} title={contactInfo}>
                        <ColorBox hex={config.themeColor} varients="border">
                            {
                                CONTACT_ICON(
                                    {
                                        width: `${iconWidth}rem`,
                                        height: `${iconHeight}rem`,
                                    },
                                    {
                                        hover,
                                        hoverDark,
                                    }
                                )[platform]
                            }
                        </ColorBox>
                    </a>
                )
            })}
            <ColorBox varients="double-bg-border" hex={config.themeColor}>
                {config.author.name} 📬
            </ColorBox>
        </div>
    )
}

export default ProfileContacts
