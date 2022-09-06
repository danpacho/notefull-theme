const Text = () => {}

const Paragraph = (props: any) => (
    <p {...props} className="text-base my-2 leading-7" />
)
const Italic = (props: any) => <em {...props} className="text-base italic" />
const Link = (props: any) => (
    <a
        {...props}
        className="text-base font-medium hover:underline hover:text-rose-600 dark:hover:text-rose-400"
    />
)
const Bold = (props: any) => (
    <strong {...props} className="text-base font-extrabold" />
)
const H1 = (props: any) => <h1 {...props} className="text-3xl font-bold my-4" />
const H2 = (props: any) => <h1 {...props} className="text-2xl font-bold my-3" />
const H3 = (props: any) => <h1 {...props} className="text-xl font-bold my-2" />

Text.Paragraph = Paragraph
Text.Italic = Italic
Text.Link = Link
Text.Bold = Bold
Text.H1 = H1
Text.H2 = H2
Text.H3 = H3

export default Text
