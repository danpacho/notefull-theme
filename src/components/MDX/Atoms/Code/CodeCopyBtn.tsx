import { useEffect, useState } from "react"

import { Copy, Success } from "@components/_icons"
import { ColorBox } from "@components/_atoms"
import { useTimeout } from "./useTimeout"

const useClipboard = () => {
    const copyText = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            return {
                isCopySuccess: true,
                copiedText: text,
            }
        } catch (e) {
            return {
                isCopySuccess: false,
                copiedText: text,
            }
        }
    }

    return {
        copyText,
    }
}

const Style = {
    common: "absolute right-3 top-3 transition",
    hide: "opacity-0",
    show: "opacity-100",
}
const CodeCopyBtn = ({
    code,
    displayCondition,
}: {
    code: string
    displayCondition: boolean
}) => {
    const [isCopySuccess, setIsCopySuccess] = useState(false)

    const { copyText } = useClipboard()

    useTimeout({
        condition: isCopySuccess,
        conditionSetter: setIsCopySuccess,
    })

    return (
        <button
            title={isCopySuccess ? "copied" : "copy"}
            onClick={async () => {
                if (!isCopySuccess) {
                    const { isCopySuccess } = await copyText(code)
                    setIsCopySuccess(isCopySuccess)
                }
            }}
            className={`${Style.common} ${
                displayCondition ? Style.show : Style.hide
            }`}
        >
            <ColorBox
                varients="bg-border"
                hex={isCopySuccess ? "#20e898" : "#ababab"}
            >
                {isCopySuccess && <Success className="scale-110" />}
                {!isCopySuccess && <Copy className="scale-110" />}
            </ColorBox>
        </button>
    )
}

export default CodeCopyBtn
