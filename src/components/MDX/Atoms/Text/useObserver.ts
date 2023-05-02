import { useCallback, useEffect, useState } from "react"

interface ObserveOptions {
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

function useElementObserver<T extends HTMLElement>({
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
}: useElementObserverProps<T>): {
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
        let ref: T | null = null
        let observer: IntersectionObserver | null = null

        const isActivated = observerRef.current !== null
        if (!isActivated) return
        if (isActivated) {
            ref = observerRef.current // save observer

            observer = new IntersectionObserver(
                customCallback ?? intersectionCallback,
                {
                    root,
                    rootMargin,
                    threshold,
                }
            )
            observer.observe(observerRef.current)
        }

        return () => {
            if (observer && ref) observer.unobserve(ref)
        }
    }, [
        observerRef,
        root,
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
