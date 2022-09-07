import {
    type PropsWithChildren,
    createContext,
    useContext,
    useState,
    useCallback,
} from "react"

const TocValueContext = createContext<string>("")
const TocSetterContext = createContext<(text: string) => void>(() => {})

function TocProvider({ children }: PropsWithChildren<React.ReactNode>) {
    const [title, setTitle] = useState<string>("")
    const action = useCallback((text: string) => {
        setTitle(text)
    }, [])

    return (
        <TocSetterContext.Provider value={action}>
            <TocValueContext.Provider value={title}>
                {children}
            </TocValueContext.Provider>
        </TocSetterContext.Provider>
    )
}

const useTocValue = () => {
    const value = useContext(TocValueContext)
    if (value == undefined)
        throw Error(
            "hook is called outside of TocProvider. Value must be access inside of provider"
        )

    return { title: value }
}

const useTocAction = () => {
    const setTitle = useContext(TocSetterContext)
    if (setTitle === undefined)
        throw Error(
            "hook is called outside of TocProvider. Action must be access inside of provider"
        )

    return {
        setTitle,
    }
}

export { TocProvider, useTocAction, useTocValue }
