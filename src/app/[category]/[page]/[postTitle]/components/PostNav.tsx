"use client"

import { Nav } from "~/components/common"

import { config } from "blog.config"

interface PostNavProps {
    category: string
}
export const PostNav = ({ category }: PostNavProps) => {
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
