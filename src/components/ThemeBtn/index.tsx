"use client"

import { useTheme } from "next-themes"

import { useMounted } from "~/hooks/useMounted"

export type ThemeMode = "light" | "dark"
export const ThemeBtn = ({ styleClass }: { styleClass: string }) => {
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
