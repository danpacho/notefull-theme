import { ThemeMode } from "@typing/theme"
import { useTheme } from "next-themes"

import { RenderAfterMounted } from "@components/_common"

const ThemeBtn = ({ styleClass }: { styleClass: string }) => {
    const { theme, setTheme } = useTheme()

    return (
        <RenderAfterMounted>
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
        </RenderAfterMounted>
    )
}

export default ThemeBtn
