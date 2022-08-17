import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document"

import { BaseSEO } from "@components/SEO"

import { config } from "blog.config"

class AppDocument extends Document {
    render() {
        return (
            <Html lang={config.language}>
                <Head>
                    <BaseSEO />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default AppDocument
