import { TailwindFontSizeType } from "@typing/tailwind"

interface TextSizeProps {
    children: React.ReactNode
    size?: TailwindFontSizeType
    mdSize?: `md:${TailwindFontSizeType}`
    styleClass?: string
}

function Title({
    children,
    size = "text-base",
    mdSize = "md:text-lg",
    styleClass,
}: TextSizeProps) {
    return (
        <h1
            className={`font-bold capitalize truncate ${size} ${mdSize} ${styleClass}`}
        >
            {children}
        </h1>
    )
}

function Description({
    children,
    size = "text-sm",
    mdSize = "md:text-sm",
    styleClass,
}: TextSizeProps) {
    return (
        <div
            className={`${size} ${mdSize} w-full overflow-hidden text-ellipsis font-normal text-gray-500 dark:text-gray-300 ${styleClass}`}
        >
            {children}
        </div>
    )
}
export { Title, Description }
