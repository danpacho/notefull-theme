import type { Node } from "unist"
import { visit } from "unist-util-visit"

export interface NodeChildrenType {
    type: string
    value: string
    position: any
}

type MarkdownElement =
    | "text"
    | "paragraph"
    | "heading"
    | "inlineCode"
    | "thematicBreak"
    | "image"

export interface MarkdownNodeType extends Node {
    type: MarkdownElement
    depth?: number
    children?: NodeChildrenType[]
    position: any
}

const findMarkdownElement = (tree: Node, mdElementArray: MarkdownElement[]) => {
    const matchedNode: MarkdownNodeType[] = []

    visit(tree, (node: any) => {
        const { type } = node as MarkdownNodeType
        if (mdElementArray.includes(type)) {
            matchedNode.push(node)
        }
    })

    return {
        matchedNode,
        notFound: matchedNode.length === 0,
    }
}

export { findMarkdownElement }
