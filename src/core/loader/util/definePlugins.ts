import type { Pluggable } from "unified"

/**
 * remark & rehype plugins
 */
const definePlugins = ({
    rehypePlugins,
    remarkPlugins,
}: {
    rehypePlugins: Pluggable[]
    remarkPlugins: Pluggable[]
}) => ({
    rehypePlugins,
    remarkPlugins,
})

export default definePlugins
