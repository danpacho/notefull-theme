import { ColorTitle as BannerTitle } from "@components/_atoms"

interface BannerProps {
    title: string
    hex: string
    description: string
}
function Banner({ title, hex, description }: BannerProps) {
    return (
        <div>
            <BannerTitle title={title} size="text-5xl" hex={hex} />
            <BannerDescription>{description}</BannerDescription>
        </div>
    )
}

const BannerDescription = ({ children }: { children: string }) => {
    return <div className="mt-6 description_text">{children}</div>
}

export default Banner
