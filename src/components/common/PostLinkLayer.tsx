"use client"

import { MetaType } from "src/interface/post/meta"

import { Grid } from "~/components/common/atoms"
import { PostLink } from "./PostLink"

interface PostLinkLayerProps {
    postMetaArray: MetaType[]
    displayAuthorInsteadCategory?: boolean
}
export const PostLinkLayer = ({
    postMetaArray,
    displayAuthorInsteadCategory = false,
}: PostLinkLayerProps) => {
    return (
        <Grid
            col="grid-cols-1"
            gap="gap-4"
            mdCol="md:grid-cols-2"
            styleClass="pb-8"
        >
            {postMetaArray.map((postMeta) => (
                <PostLink
                    {...postMeta}
                    displayAuthorInsteadCategory={displayAuthorInsteadCategory}
                    key={postMeta.title}
                />
            ))}
        </Grid>
    )
}
