"use client"

import { useCallback, useRef } from "react"
import { useTocAction } from "~/components/providers/TocProvider"

import { ObserveOptions, useElementObserver } from "./useObserver"

const UPDATE_CONDITION = {
    top: 50,
    bottom: -100,
} as const

const OBSERVER_OPTION = {
    rootMarginTop: "-20px",
    rootMarginBottom: "0px",
    threshold: [0, 1],
} satisfies ObserveOptions

const useTrackTitle = <TitleElement extends HTMLHeadingElement>() => {
    const { setActiveTitle } = useTocAction()
    const observerRef = useRef<TitleElement>(null)

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
            rootMarginTop: OBSERVER_OPTION.rootMarginTop,
            rootMarginBottom: OBSERVER_OPTION.rootMarginBottom,
            threshold: OBSERVER_OPTION.threshold,
        },
        customCallback: updateFocusTitle,
    })

    return {
        observerRef,
    }
}

export { useTrackTitle }
