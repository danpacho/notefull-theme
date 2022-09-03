import { PropsWithChildren, useEffect, useState } from "react"

const useMounted = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    return { isMounted }
}

/**
 * @returns Render the component after client `mounted`. Usefull for safer data accessing
 */
function RenderAfterMounted({ children }: PropsWithChildren<React.ReactNode>) {
    const { isMounted } = useMounted()

    if (!isMounted) return <></>
    return <>{children}</>
}

export default RenderAfterMounted
