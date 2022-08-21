import { remark } from "remark"

import { findMarkdownElment, MarkdownNodeType } from "./findMarkdownElement"

type Concrete<Type> = {
    [Property in keyof Type]-?: Type[Property]
}
type MarkdownHeader = Concrete<MarkdownNodeType>
const extractHeader = (pureMarkdownSource: string) => {
    let headerNode: MarkdownHeader[] = []
    remark()
        .use(() => (tree) => {
            const { matchedNode, notFound } = findMarkdownElment(tree, [
                "heading",
            ])
            if (notFound) headerNode = []
            if (!notFound) headerNode = matchedNode as MarkdownHeader[]
        })
        .process(pureMarkdownSource)
    return headerNode.filter(({ depth }) => depth === 1 || depth === 2)
}

type HeaderType = "H1" | "H2"
interface HeaderInfo {
    title: string
    href: string
    type: HeaderType
}

interface H2Children extends Omit<HeaderInfo, "type"> {}

/**
 * - table of contents of post
 * - `H1 ➡️ H2` nesting support
 * - generated at server, resolving `CLS` problem
 * @example
 * const toc = [
 * {
 *      href: "#This is First H1",
 *      title: "This is First H1",
 *      children:
 *          [{
 *              href: "#child 1",
 *              title:"child 1"
 *          },
 *          {
 *              href: "#child 2",
 *              title: "child 2"
 *          }]
 *  },{
 *      href: "#This is Second H1",
 *      title: "This is Second H1",
 *      children:
 *          [{
 *              href: "#child 1",
 *              title:"child 1"
 *          }]
 *  }]
 */
export interface TableOfContentsType extends Omit<HeaderInfo, "type"> {
    children: H2Children[] | null
}
function transformTableOfContents(
    source: MarkdownHeader[]
): TableOfContentsType[] {
    if (source.length === 0) return []

    const headerInfoArray: HeaderInfo[] = source.map(({ children, depth }) => {
        const text = children[0].value
        return {
            title: text,
            href: `#${text}`,
            type: `H${depth}` as HeaderType,
        }
    })

    const H1IndexArray = headerInfoArray.reduce<number[]>(
        (acc, { type }, idx) => (type === "H1" ? [...acc, idx] : acc),
        []
    )

    const tableOfContentsArray = headerInfoArray.reduce<TableOfContentsType[]>(
        (acc, { href, title, type }, index) => {
            if (type === "H2") return acc

            const nextHeaderIndex = index + 1
            const nextH1Index: number | undefined =
                H1IndexArray[H1IndexArray.indexOf(index) + 1]

            const isChildrenNotExsist = nextHeaderIndex === nextH1Index

            if (isChildrenNotExsist) {
                return [
                    ...acc,
                    {
                        href,
                        title,
                        children: null,
                    },
                ]
            }

            const H1Children = headerInfoArray
                .slice(nextHeaderIndex, nextH1Index)
                .map<H2Children>(({ href, title }) => ({
                    href,
                    title,
                }))

            return [
                ...acc,
                {
                    href,
                    title,
                    children: H1Children.length === 0 ? null : H1Children,
                },
            ]
        },
        []
    )

    return tableOfContentsArray
}

const getTableOfContents = (
    pureMarkdownSource: string
): TableOfContentsType[] => {
    const sorce = extractHeader(pureMarkdownSource)
    const tableOfContent = transformTableOfContents(sorce)
    return tableOfContent
}

export default getTableOfContents
