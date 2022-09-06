function Quote(props: any) {
    return (
        <blockquote
            {...props}
            className={`w-full pl-4 font-medium border-l-4 border-neutral-200 dark:border-neutral-600`}
        />
    )
}

export default Quote
