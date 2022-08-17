import { useMemo } from "react"
import { getMDXComponent } from "mdx-bundler/client"

import { MDXComponents } from "mdx/types"

import MDXAtoms from "@components/MDXAtoms"

interface MDXBundlerProp {
    source: string
}

function MDXBundler({ source }: MDXBundlerProp) {
    const BundledComponent = useMemo(() => getMDXComponent(source), [source])

    return <BundledComponent components={MDXAtoms as MDXComponents} />
}

export default MDXBundler
