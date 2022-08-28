import Link from "next/link"

const NavigationList = {
    Home: {
        path: "/",
    },
    Category: {
        path: "/category",
    },
    Profile: {
        path: "/profile",
    },
}
const NavagationRouteName = Object.keys(NavigationList) as Array<
    keyof typeof NavigationList
>

function Navigation() {
    return (
        <nav className="sticky bottom-0 flex flex-row items-start justify-center gap-4 py-2 bg-white border-t -z-0 border-t-gray-300 md:border-t-0 md:text-gray-300 md:hover:text-black md:fixed md:gap-0 md:top-0 lg:right-[5%] md:right-0 md:flex-col">
            {NavagationRouteName.map((route) => {
                const { path } = NavigationList[route]
                return (
                    <div
                        key={route}
                        className="py-1 mx-2 text-sm font-normal transition-all border-b border-b-transparent hover:border-b-black md:px-2 md:border-l md:hover:border-l-black md:hover:border-b-transparent hover:text-black"
                    >
                        <Link href={path}>{route}</Link>
                    </div>
                )
            })}
            <button className="py-1 mx-2 text-sm font-normal transition-all border-b border-b-transparent hover:border-b-black md:px-2 md:border-l md:hover:border-l-black md:hover:border-b-transparent hover:text-black">
                Light
            </button>
        </nav>
    )
}

export default Navigation
