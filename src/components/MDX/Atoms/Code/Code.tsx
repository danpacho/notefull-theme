interface CodeProps {
    children: string
    className?: string
}
function Code(props: CodeProps) {
    if (!props.className) return <code {...props} /> //* inline code
    const language = props.className.split(" ")[0].replace("language-", "")

    return (
        <>
            <code {...props} />
            <div>{language}</div>
        </>
    )
}

export default Code
