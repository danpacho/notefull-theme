import useTrackTitle from "./useTrackTitle"

const Text = () => {}

const Paragraph = (props: any) => (
    <p {...props} className=" my-2 text-base font-normal leading-7" />
)
const Italic = (props: any) => <em {...props} className="text-base italic" />
const Link = (props: any) => (
    <a
        {...props}
        className="mx-0.5 text-base underline font-medium text-neutral-600 dark:text-neutral-400 hover:text-green-600 dark:hover:text-green-400"
    />
)
const Bold = (props: any) => (
    <strong {...props} className="text-base font-extrabold" />
)
//============================== TOC 1 ==============================
const H1 = (props: any) => {
    const { observerRef } = useTrackTitle()
    return (
        <h1
            {...props}
            ref={observerRef}
            className="text-3xl font-bold my-2 py-2"
        />
    )
}
//============================== TOC 2 ==============================
const H2 = (props: any) => {
    const { observerRef } = useTrackTitle()
    return (
        <h1
            {...props}
            ref={observerRef}
            className="text-2xl font-bold my-1 py-2"
        />
    )
}
const H3 = (props: any) => (
    <h1 {...props} className="text-xl font-bold my-1 py-1" />
)

Text.Paragraph = Paragraph
Text.Italic = Italic
Text.Link = Link
Text.Bold = Bold
Text.H1 = H1
Text.H2 = H2
Text.H3 = H3

export default Text
