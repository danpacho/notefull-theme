import { ColorBox } from "~/components/common/atoms"

import { config } from "blog.config"

export const ProfileFooter = () => {
    return (
        <footer className="flex flex-col gap-4 items-start justify-center pb-4">
            <p className="text-neutral-500 dark:text-neutral-400">
                {config.copyright}
            </p>
            <ColorBox hex={config.themeColor} style="border" layout="flex">
                <a
                    className="font-mono italic font-bold text-xs hover:underline "
                    href="https://github.com/danpacho/notefull-theme"
                >
                    🔌 Powered by Notefull ⚡️
                </a>
            </ColorBox>
        </footer>
    )
}
