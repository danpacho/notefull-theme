import { MetaType } from "@typing/post/meta"

import { Grid } from "@components/_atoms"
import PostLink from "./PostLink"

interface PostLinkLayerProps {
    postMetaArray: MetaType[]
}
function PostLinkLayer({ postMetaArray }: PostLinkLayerProps) {
    return (
        <Grid
            row="grid-rows-2"
            col="grid-cols-1"
            gap="gap-4"
            mdCol="md:grid-cols-2"
            styleClass="pb-8"
        >
            {postMetaArray.map((postMeta) => (
                <PostLink {...postMeta} key={postMeta.title} />
            ))}
        </Grid>
    )
}

export default PostLinkLayer
