import { useCallback, useRef } from "react"
import { useTocAction } from "@components/TocProvider"

import useElementObserver from "./useObserver"

const UPDATE_CONDITION = {
    top: 120,
    bottom: -120,
}
const ROOT_MARGIN = {
    top: "-15px",
    bottom: "0px",
}
function useTrackTitle<T extends HTMLHeadingElement>() {
    const { setTitle } = useTocAction()
    const observerRef = useRef<T>(null)

    const updateFocusTitle: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                const { top } = entry.boundingClientRect
                if (
                    top <= UPDATE_CONDITION.top &&
                    top >= UPDATE_CONDITION.bottom
                ) {
                    setTitle(observerRef.current?.textContent!)
                }
            })
        },
        [setTitle]
    )

    useElementObserver({
        observerRef,
        options: {
            rootMarginTop: ROOT_MARGIN.top,
            rootMarginBottom: ROOT_MARGIN.bottom,
            threshold: [0, 1],
        },
        customeCallback: updateFocusTitle,
    })

    return {
        observerRef,
    }
}

export default useTrackTitle
