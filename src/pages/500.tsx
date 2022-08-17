import { PageType } from "@typing/page"

function ErrorPage() {
    return <div>500</div>
}

ErrorPage.displayName = "Error" as PageType
export default ErrorPage
