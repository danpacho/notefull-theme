import { config } from "blog.config"

const POST_DIR_NAME = "posts" as const

const BLOG_CONTENTS_DIR =
    `${config.blogContentsDirectoryName}/contents` as const
const BLOG_PROFILE_DIR =
    `${config.blogContentsDirectoryName}/profile/description.mdx` as const

export { BLOG_CONTENTS_DIR, BLOG_PROFILE_DIR, POST_DIR_NAME }
