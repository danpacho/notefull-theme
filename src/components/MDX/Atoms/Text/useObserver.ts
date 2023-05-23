"use client"

import { useCallback, useEffect, useState } from "react"

export interface ObserveOptions {
    root?: IntersectionObserverInit["root"]
    threshold?: IntersectionObserverInit["threshold"]
    rootMarginTop?: string
    rootMarginBottom?: string
    rootMarginLeft?: string
    rootMarginRight?: string
}

interface useElementObserverProps<T> {
    observerRef: React.RefObject<T>
    options: ObserveOptions
    customCallback?: IntersectionObserverCallback
}

function useElementObserver<Element extends HTMLElement>({
    observerRef,
    options: {
        root = null,
        rootMarginBottom = "0px",
        rootMarginTop = "0px",
        rootMarginLeft = "0px",
        rootMarginRight = "0px",
        threshold = 0,
    },
    customCallback,
}: useElementObserverProps<Element>): {
    isVisible: boolean
    setIsVisible: (isVisible: boolean) => void
} {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const rootMargin = `${rootMarginTop} ${rootMarginRight} ${rootMarginBottom} ${rootMarginLeft}`

    const intersectionCallback: IntersectionObserverCallback = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(({ isIntersecting }) => {
                if (isIntersecting) setIsVisible(true)
                if (!isIntersecting) setIsVisible(false)
            })
        },
        []
    )

    useEffect(() => {
        let observerRefCache: Element | null = null
        let observer: IntersectionObserver | null = null

        const isActivated = observerRef.current !== null
        if (!isActivated) return

        observerRefCache = observerRef.current // save observer

        observer = new IntersectionObserver(
            customCallback ?? intersectionCallback,
            {
                root,
                rootMargin,
                threshold,
            }
        )
        observer.observe(observerRefCache)

        return () => {
            if (observer && observerRefCache)
                observer.unobserve(observerRefCache)
        }
    }, [
        root,
        observerRef,
        rootMargin,
        threshold,
        customCallback,
        intersectionCallback,
    ])

    return {
        isVisible,
        setIsVisible,
    }
}
export { useElementObserver }
