import { BLOG_CONTENTS_DIR } from "@constants/index"
import { join as pathJoin } from "path"

const blogContentsDir = pathJoin(process.cwd(), BLOG_CONTENTS_DIR)

export default blogContentsDir
