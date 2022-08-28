import { DefaultSeo, DefaultSeoProps } from "next-seo"

import { config } from "blog.config"

interface MetaTag {
    name: string
    content: string
}
const contactMetaTags = Object.entries(config.author.contacts).reduce<
    MetaTag[]
>(
    (acc, [platform, link]) =>
        platform
            ? [
                  ...acc,
                  {
                      name: platform,
                      content: link,
                  },
              ]
            : acc,
    [] as MetaTag[]
)

const DEFAULT_SEO_PROPS: DefaultSeoProps = {
    title: config.siteName,
    description: config.subtitle,
    openGraph: {
        title: config.siteName,
        description: config.subtitle,
        url: config.url,
        locale: config.language,
        profile: {
            username: config.author.name,
        },
    },
    additionalMetaTags: [
        {
            name: "author",
            content: config.author.name,
        },
        {
            name: "introduce",
            content: config.author.introduce,
        },
        ...contactMetaTags,
    ],
}

function DefaultSEO() {
    return <DefaultSeo {...DEFAULT_SEO_PROPS} />
}

export { DefaultSEO }
