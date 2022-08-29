import { useEffect } from "react"
import { useTheme } from "next-themes"

import useWindowTheme from "./useWindowTheme"
import { ThemeMode } from "@typing/theme"

const ThemeBtn = ({ styleClass }: { styleClass: string }) => {
    const { theme, setTheme } = useTheme()

    const windowTheme = useWindowTheme()

    useEffect(() => {
        setTheme(windowTheme)
    }, [windowTheme, setTheme])

    return (
        <button
            onClick={() =>
                (theme as ThemeMode) === "light"
                    ? setTheme("dark")
                    : setTheme("light")
            }
            className={styleClass}
        >
            {theme === "dark" && "Light"}
            {theme === "light" && "Dark"}
        </button>
    )
}

export default ThemeBtn
