import type { PageType } from "src/interface/page"

import { Banner } from "~/components/_common"
import { config } from "blog.config"

function ErrorPage() {
    return (
        <Banner
            title="Oops!"
            description="sorry, there is no content in this link!"
            hex={config.themeColor}
        />
    )
}

ErrorPage.displayName = "Error" as PageType
export default ErrorPage
