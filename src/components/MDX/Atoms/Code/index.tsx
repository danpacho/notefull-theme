import { useEffect, useRef, useState } from "react"

import CodeCopyBtn from "./CodeCopyBtn"
import { useTimeout } from "./useTimeout"

const Code = () => {}

const useInnerCode = () => {
    const codeRef = useRef<HTMLPreElement>(null)
    const [code, setCode] = useState("")
    useEffect(() => {
        codeRef.current?.textContent && setCode(codeRef.current.textContent)
    }, [])

    return {
        codeRef,
        code,
    }
}
interface CodeBlockProps {
    children: string
    className?: string
}
const Block = (props: CodeBlockProps) => {
    const isInlineCode = !props.className

    if (isInlineCode)
        return (
            <code
                {...props}
                className="px-1 font-medium bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-emerald-400 text-red-600 dark:text-emerald-400 rounded-sm break-words"
            />
        )

    return (
        <code
            {...props}
            className="inline-table text-neutral-100 md:text-[0.925rem] text-sm font-medium"
        />
    )
}

const Pre = (props: any) => {
    const [hoverOut, setHoverOut] = useState(false)
    const [displayBtn, setDisplayBtn] = useState(false)
    const { code, codeRef } = useInnerCode()

    useTimeout({
        conditionSetter: setDisplayBtn,
        condition: hoverOut,
    })

    return (
        <div
            onPointerEnter={() => {
                setHoverOut(false)
                setDisplayBtn(true)
            }}
            onPointerLeave={() => setHoverOut(true)}
            className="relative w-[calc(100%+2.5rem)] ml-[-1.25rem] md:ml-[-2rem] md:w-[calc(100%+4rem)] my-2 bg-gray-800 dark:bg-neutral-900 border border-transparent dark:border-neutral-700"
        >
            <pre
                {...props}
                ref={codeRef}
                className=" flex flex-col overflow-x-auto py-4"
            />
            <CodeCopyBtn code={code} displayCondition={displayBtn} />
        </div>
    )
}

Code.Block = Block
Code.Pre = Pre

export default Code
