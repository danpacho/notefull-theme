import {
    TailwindFontColorType,
    TailwindFontWeightType,
} from "../../types/tailwind/index"

import type { Node } from "unist"
import { visit } from "unist-util-visit"

type TokenType =
    | "tag"
    | "keyword"
    | "operator"
    | "attr-name"
    | "attr-value"
    | "deleted"
    | "inserted"
    | "string"
    | "url"
    | "entity"
    | "symbol"
    | "property"
    | "boolean"
    | "number"
    | "constant"
    | "function"
    | "builtin"
    | "char"
    | "comment"
    | "prolog"
    | "cdata"
    | "punctuation"
    | "namespace"
    | "slector"
    | "doctype"
    | "atrule"
    | "regex"
    | "important"
    | "variable"
    | "bold"
    | "maybe-class-name"
    | "known-class-name"
    | "class-name"
    | "generic"

const tokenClassNames: {
    [key in TokenType]:
        | `${TailwindFontColorType}`
        | `${TailwindFontColorType} ${TailwindFontWeightType}`
        | `${TailwindFontColorType} italic`
        | `${TailwindFontWeightType}`
        | `text-[${string}]`
        | `text-[${string}] ${TailwindFontWeightType}`
} = {
    // teal 500
    inserted: "text-teal-500",
    entity: "text-teal-500",
    url: "text-teal-500",
    symbol: "text-teal-500",
    property: "text-teal-500",

    // green 300
    string: "text-green-300 italic",

    // blue #82aaff
    constant: "text-[#82aaff] font-semibold",
    function: "text-[#82aaff] font-semibold",
    builtin: "text-[#82aaff] font-semibold",
    char: "text-[#82aaff] font-semibold",

    // red 400
    tag: "text-red-400 font-bold",
    boolean: "text-red-400",
    // red 500
    deleted: "text-red-500 italic",

    // orange 200
    atrule: "text-orange-200",
    number: "text-orange-200",
    "maybe-class-name": "text-orange-200 font-bold",
    "attr-value": "text-orange-200",
    // orange 300
    generic: "text-orange-300 font-bold",
    "class-name": "text-orange-300 font-bold",
    "known-class-name": "text-orange-300 font-bold",
    "attr-name": "text-orange-300",

    // neutral 100
    important: "text-neutral-100 font-bold",
    regex: "text-neutral-100",
    variable: "text-neutral-100",
    // neutral 300
    punctuation: "text-neutral-300",
    // neutral 500
    namespace: "text-neutral-500",
    comment: "text-neutral-500 italic",
    prolog: "text-neutral-500 italic",
    cdata: "text-neutral-500 italic",

    // purple #c792ea
    keyword: "text-[#c792ea] font-bold",
    operator: "text-[#c792ea] font-bold",
    slector: "text-[#c792ea] font-bold",
    doctype: "text-[#c792ea] font-bold",

    bold: "font-bold",
} as const

type TokenNameType = "token" | "code-line"

const rehypeInjectCodeClassName = () => (tree: Node) => {
    visit(tree, "element", (node: any) => {
        const [token, type]: [TokenNameType, TokenType] =
            node.properties?.className ?? []

        const isCode = token === "code-line" || token === "token"

        if (isCode) node.properties.className.push(tokenClassNames[type])
    })
}

export default rehypeInjectCodeClassName
