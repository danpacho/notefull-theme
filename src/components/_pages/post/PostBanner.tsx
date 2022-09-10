import type { MetaType } from "@typing/post/meta"
import type { SeriesHeaderProps } from "@components/_common/SeriesContainer"

import { Banner, SeriesContainer } from "@components/_common"

import PostMeta from "./PostMeta"

import { config } from "blog.config"

interface PostBannerProps
    extends MetaType,
        Partial<Omit<SeriesHeaderProps, "hex">> {}
function PostBanner({
    title,
    color,
    tags,
    preview,
    category,
    update,
    author,
    seriesInfoArray,
    seriesTitle,
    seriesCount,
}: PostBannerProps) {
    const isSeriescExsists =
        seriesTitle !== undefined &&
        seriesInfoArray !== undefined &&
        seriesCount !== undefined

    return (
        <div
            className={`w-full flex flex-col gap-10 pb-6 border-b border-b-neutral-200 dark:border-b-neutral-600`}
        >
            <Banner description={preview} title={title} hex={color} />

            <div className="flex flex-col gap-4 items-start justify-center">
                <div className="flex flex-col gap-2">
                    <PostMeta
                        hex={color}
                        metaArray={[
                            { content: category, path: `/${category}` },
                            update,
                            {
                                content: author,
                                path: config.navigationMenu[2].path,
                            },
                        ]}
                    />
                    <PostMeta
                        hex={color}
                        metaArray={tags.map((tag) => `# ${tag}`)}
                    />
                </div>

                {isSeriescExsists && (
                    <SeriesContainer
                        hex={color}
                        seriesInfoArray={seriesInfoArray}
                        seriesTitle={seriesTitle}
                        seriesCount={seriesCount}
                    />
                )}
            </div>
        </div>
    )
}

export default PostBanner
