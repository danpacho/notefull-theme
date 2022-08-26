import { config } from "blog.config"

const BLOG_CONTENTS_DIR =
    `${config.blogContentsDirectoryName}/contents` as const
const BLOG_PROFILE_DIR =
    `${config.blogContentsDirectoryName}/profile.mdx` as const

export { BLOG_CONTENTS_DIR, BLOG_PROFILE_DIR }
