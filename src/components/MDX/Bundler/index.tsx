import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"

import MDXAtoms from "@components/MDX/Atoms"

interface MDXBundlerProp {
    source: string
}

function MDXBundler({ source }: MDXBundlerProp) {
    const BundledComponent = useMemo(() => getMDXComponent(source), [source])

    return <BundledComponent components={MDXAtoms} />
}

export default MDXBundler
