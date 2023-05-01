import { FILE_EXCEPTION_LIST } from "@constants/blog.file.exception"
import { readdir } from "fs/promises"

const getFileNames = async (dir: string) =>
    (await readdir(dir, "utf-8")).filter(
        (fileName) =>
            FILE_EXCEPTION_LIST.includes(fileName.replace(/./g, "")) === false
    )

export { getFileNames }
