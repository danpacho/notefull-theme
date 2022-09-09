import { MDXComponents } from "mdx/types"

import Text from "./Text"
import List from "./List"
import Image from "./Image"
import Code from "./Code"
import Quote from "./Quote"
import Table from "./Table"
import Divider from "./Divider"

const MDXAtoms = {
    p: Text.Paragraph,
    strong: Text.Bold,
    em: Text.Italic,
    a: Text.Link,
    h1: Text.H1,
    h2: Text.H2,
    h3: Text.H3,

    li: List.Li,
    ol: List.Ol,
    ul: List.Ul,

    table: Table,
    th: Table.Th,
    td: Table.Td,
    tr: Table.Tr,

    blockquote: Quote,

    code: Code.Block,
    pre: Code.Pre,

    img: Image,

    hr: Divider,
} as MDXComponents

export default MDXAtoms
