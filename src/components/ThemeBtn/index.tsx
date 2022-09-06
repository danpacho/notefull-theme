import { ThemeMode } from "@typing/theme"
import { useTheme } from "next-themes"

import useMounted from "@hooks/useMounted"

const ThemeBtn = ({ styleClass }: { styleClass: string }) => {
    const { theme, setTheme } = useTheme()
    const { isMounted } = useMounted()
    return (
        <>
            <button
                onClick={() =>
                    (theme as ThemeMode) === "light"
                        ? setTheme("dark")
                        : setTheme("light")
                }
                className={styleClass}
            >
                {!isMounted && "⚡️"}
                {isMounted && (theme === "dark" ? "Light" : "Dark")}
            </button>
        </>
    )
}

export default ThemeBtn
