import Navigation from "./Navigation"
import NoteBackground from "./NoteBackground"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="mx-auto layout">
            {children}
            <Navigation />
            <NoteBackground rectSize={100} />
        </main>
    )
}

export default Layout
