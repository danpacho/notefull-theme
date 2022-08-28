import { ColorTitle as BannerTitle } from "@components/_atoms"

interface BannerProps {
    title: string
    hex: string
    description: string
}
const Banner = ({ title, hex, description }: BannerProps) => {
    return (
        <div>
            <BannerTitle title={title} size="text-5xl" hex={hex} />
            <BannerDescription>{description}</BannerDescription>
        </div>
    )
}

const BannerDescription = ({ children }: { children: string }) => {
    return <div className="mt-6 font-light text-gray-500">{children}</div>
}

export default Banner
