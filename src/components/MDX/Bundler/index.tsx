"use client"

import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"
import { MDXAtoms } from "../atoms"

interface MDXBundlerProp {
    source: string
}
const MDXBundler = ({ source }: MDXBundlerProp) => {
    const BundledComponent = useMemo(() => getMDXComponent(source), [source])

    return <BundledComponent components={MDXAtoms} />
}

export { MDXBundler }
