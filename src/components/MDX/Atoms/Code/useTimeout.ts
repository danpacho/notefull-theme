import { useEffect } from "react"

const useTimeout = ({
    condition,
    conditionSetter,
    time = 2000,
}: {
    conditionSetter: (state: boolean) => void
    condition: boolean
    time?: number
}) => {
    useEffect(() => {
        if (condition) {
            const setToFalse = () => conditionSetter(false)
            const timeout = setTimeout(setToFalse, time ?? 2000)
            return () => clearTimeout(timeout)
        }
    }, [conditionSetter, time, condition])
}
export { useTimeout }
