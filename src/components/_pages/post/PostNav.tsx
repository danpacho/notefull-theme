import { Nav } from "@components/_common"

import { config } from "blog.config"

interface PostNavProps {
    category: string
}
function PostNav({ category }: PostNavProps) {
    return (
        <Nav>
            <Nav.Btn
                name={config.navigationMenu[0].name}
                path={config.navigationMenu[0].path}
            />
            <Nav.Btn name={category} path={`/${category}`} />
        </Nav>
    )
}

export default PostNav
