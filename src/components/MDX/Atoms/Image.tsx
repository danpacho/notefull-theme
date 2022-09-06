import NextImage from "next/image"

interface ImageProps {
    alt: string
    src: string
}
function Image(props: ImageProps) {
    const { src, alt } = props
    const [pureAlt, width, height] = alt.split(":")?.map((text) => text.trim())
    const isExternalImage = src.startsWith("http")

    return (
        <>
            {isExternalImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    {...props}
                    width={width}
                    height={height}
                    alt={pureAlt}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onContextMenu={(e) => e.preventDefault()}
                />
            ) : (
                <NextImage
                    {...props}
                    width={width}
                    height={height}
                    alt={pureAlt}
                    quality={75}
                    loading="lazy"
                    crossOrigin="anonymous"
                    onContextMenu={(e) => e.preventDefault()}
                />
            )}
        </>
    )
}

export default Image
