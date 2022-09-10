import { useCallback, useRef } from "react"
import { useTocAction } from "@components/TocProvider"

import useElementObserver from "./useObserver"

const UPDATE_CONDITION = {
    top: 50,
    bottom: -100,
} as const
const OBSERVER_OPTION = {
    top: "-20px",
    bottom: "0px",
    threshold: [0, 1],
}
function useTrackTitle<T extends HTMLHeadingElement>() {
    const { setActiveTitle } = useTocAction()
    const observerRef = useRef<T>(null)

    const updateFocusTitle: IntersectionObserverCallback = useCallback(
        (entries) => {
            entries.forEach((entry) => {
                const { top } = entry.boundingClientRect
                if (
                    top <= UPDATE_CONDITION.top &&
                    top >= UPDATE_CONDITION.bottom
                ) {
                    setActiveTitle(observerRef.current?.textContent!)
                }
            })
        },
        [setActiveTitle]
    )

    useElementObserver({
        observerRef,
        options: {
            rootMarginTop: OBSERVER_OPTION.top,
            rootMarginBottom: OBSERVER_OPTION.bottom,
            threshold: OBSERVER_OPTION.threshold,
        },
        customeCallback: updateFocusTitle,
    })

    return {
        observerRef,
    }
}

export default useTrackTitle
