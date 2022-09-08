import {
    type PropsWithChildren,
    createContext,
    useContext,
    useState,
    useCallback,
} from "react"

type TocValueType = string
type TocActionType = (text: string) => void
const TocValueContext = createContext<TocValueType>("")
const TocSetterContext = createContext<TocActionType>(() => {})

function TocProvider({ children }: PropsWithChildren<React.ReactNode>) {
    const [activeTitle, setActiveTitle] = useState<TocValueType>("")
    const cachedAction = useCallback((text: string) => {
        setActiveTitle(text)
    }, [])

    return (
        <TocSetterContext.Provider value={cachedAction}>
            <TocValueContext.Provider value={activeTitle}>
                {children}
            </TocValueContext.Provider>
        </TocSetterContext.Provider>
    )
}

const useTocValue = (): {
    activeTitle: TocValueType
} => {
    const activeTitle = useContext(TocValueContext)
    if (activeTitle === undefined) {
        console.error(
            "hook is called outside of TocProvider. Action must be access inside of provider"
        )
        return {
            activeTitle: "",
        }
    }

    return { activeTitle }
}

const useTocAction = (): {
    setActiveTitle: TocActionType
} => {
    const setActiveTitle = useContext(TocSetterContext)
    if (setActiveTitle === undefined) {
        console.error(
            "hook is called outside of TocProvider. Action must be access inside of provider"
        )
        return {
            setActiveTitle: () => {},
        }
    }

    return {
        setActiveTitle,
    }
}

export { TocProvider, useTocAction, useTocValue }
