"use client"

import {
    ColorTitle as BannerTitle,
    Description,
} from "~/components/common/atoms"

interface BannerProps {
    title: string
    hex: string
    description: string
    containerStyleClass?: string
    href?: string
}
export const Banner = ({
    title,
    hex,
    description,
    containerStyleClass,
    href,
}: BannerProps) => {
    return (
        <div className={containerStyleClass}>
            <BannerTitle
                title={title}
                mdSize="md:text-5xl"
                size="text-4xl"
                hex={hex}
                href={href}
            />
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
