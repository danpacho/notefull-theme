import { util } from "@styles/tailwind.util"

function Quote(props: any) {
    return (
        <blockquote
            {...props}
            className={`${util.fullWidth.class} pl-7 pr-4 font-medium border-l-8 border-neutral-200 bg-neutral-50/50 border dark:border-neutral-600 dark:bg-neutral-900/50`}
        />
    )
}

export default Quote
