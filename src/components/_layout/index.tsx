import Navigation from "./Navigation"
import NoteBackground from "./NoteBackground"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen mx-auto md:w-3/4 lg:w-4/6">
            {children}
            <Navigation />
            <NoteBackground rectSize={100} />
        </main>
    )
}

export default Layout
