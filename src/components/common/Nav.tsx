"use client"

import type { PropsWithChildren } from "react"
import Link from "next/link"

import { ThemeBtn } from "~/components/ThemeBtn"
import { tw } from "~/styles/tailwind"
import { config } from "blog.config"

const nav = tw.style({
    position: "fixed",
    bottom: "bottom-[-0.1px]",
    left: "left-0",
    zIndex: "z-0",

    display: "flex",
    flexDirection: "flex-row",
    alignItems: "items-center",
    justifyContent: "justify-center",
    gap: "gap-2",

    width: "w-full",
    paddingY: "py-2",

    borderTopWidth: "border-t",
    borderTopColor: "border-t-gray-300",
    backgroundColor: "bg-white",
    color: "text-gray-400",
    ":hover": {
        color: "hover:text-black",
    },
    "@dark": {
        backgroundColor: "dark:bg-neutral-900",
        ":hover": {
            color: "dark:hover:text-gray-300",
        },
    },
    "@md": {
        left: "md:left-[unset]",
        gap: "md:gap-0",
        top: "md:top-0",
        right: "md:right-0",

        flexDirection: "md:flex-col",
        alignItems: "md:items-start",

        width: "md:w-fit",
        borderTopWidth: "md:border-t-0",
        backgroundColor: "md:bg-transparent",
        "@dark": {
            backgroundColor: "md:dark:bg-transparent",
        },
    },
    "@lg": {
        right: "lg:right-[5%]",
    },
    "@xl": {
        right: "xl:right-[11%]",
    },
})

const navBtn = tw.style({
    fontSize: "text-sm",
    fontWeight: "font-normal",
    paddingY: "py-1",
    marginX: "mx-2",
    "@md": {
        paddingX: "md:px-2",
        borderBottomWidth: "md:border-b-0",
        borderLeftWidth: "md:border-l",
        borderLeftColor: "md:border-l-gray-300",
        "@dark": {
            borderLeftColor: "md:dark:border-l-gray-700",
            ":hover": {
                borderLeftColor: "md:dark:hover:border-l-gray-100",
            },
        },
        ":hover": {
            borderLeftColor: "md:hover:border-l-black",
        },
    },
    transition: "transition",
    borderBottomWidth: "border-b",
    borderBottomColor: "border-b-transparent",
    ":hover": {
        color: "hover:text-black",
        borderBottomColor: "hover:border-b-black",
        "@dark": {
            borderBottomColor: "hover:dark:border-b-gray-100",
            color: "hover:dark:text-gray-100",
        },
    },
})

export const Nav = ({ children, id }: PropsWithChildren<{ id?: string }>) => {
    return (
        <nav className={nav.class} id={id}>
            {children}
            <ThemeBtn styleClass={navBtn.class} />
        </nav>
    )
}
const Btn = ({ path, name }: { path: string; name: string }) => {
    return (
        <Link
            href={path}
            className={navBtn.class}
            aria-label={`Link to ${name}`}
        >
            {name}
        </Link>
    )
}
Nav.Btn = Btn

export const MAIN_NAV_ID = "global-nav" as const
export const MainNav = () => {
    return (
        <Nav id={MAIN_NAV_ID}>
            {config.navigationMenu.map(({ name, path }) => (
                <Nav.Btn key={name} name={name} path={path} />
            ))}
        </Nav>
    )
}
