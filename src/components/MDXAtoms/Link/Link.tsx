interface LinkProps {
    href: string
    children: string
    target: string
}

function Link({ children, href, target }: LinkProps) {
    return (
        <a href={href} target={target}>
            {children}
        </a>
    )
}

export default Link
