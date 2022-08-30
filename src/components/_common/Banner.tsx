import { ColorTitle as BannerTitle, Description } from "@components/_atoms"

interface BannerProps {
    title: string
    hex: string
    description: string
    href?: string
}
function Banner({ title, hex, description, href }: BannerProps) {
    return (
        <div>
            <BannerTitle title={title} size="text-5xl" hex={hex} href={href} />
            <Description
                size="text-base"
                mdSize="md:text-base"
                styleClass="mt-6"
            >
                {description}
            </Description>
        </div>
    )
}

export default Banner
