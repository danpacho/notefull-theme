import { MetaType } from "@typing/post/meta"

import { Grid } from "@components/_atoms"
import PostLink from "./PostLink"

interface PostLinkLayerProps {
    postMetaArray: MetaType[]
    displayAuthorInsteadCategory?: boolean
}
function PostLinkLayer({
    postMetaArray,
    displayAuthorInsteadCategory = false,
}: PostLinkLayerProps) {
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

export default PostLinkLayer
