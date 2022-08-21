import Paragraph from "./Text/Paragraph"
import Italic from "./Text/Italic"
import Bold from "./Text/Bold"
import H1 from "./Text/H1"
import H2 from "./Text/H2"
import H3 from "./Text/H3"
import Link from "next/link"

import Code from "./Code/Code"
import Pre from "./Code/Pre"

import LI from "./List/LI"
import OL from "./List/OL"
import UL from "./List/UL"
import Quote from "./Quote"

import Divider from "./Divider"

import Table from "./Table/Table"
import TD from "./Table/TD"
import TH from "./Table/TH"
import TR from "./Table/TR"

import { MDXComponents } from "mdx/types"
import Image from "./Image"

const MDXAtoms = {
    p: Paragraph,
    strong: Bold,
    em: Italic,
    a: Link,

    h1: H1,
    h2: H2,
    h3: H3,

    ol: OL,
    ul: UL,
    li: LI,

    blockquote: Quote,

    pre: Pre,
    code: Code,

    img: Image,

    hr: Divider,

    table: Table,
    th: TH,
    td: TD,
    tr: TR,
} as MDXComponents

export default MDXAtoms
