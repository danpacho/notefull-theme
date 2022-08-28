import Navigation from "./Navigation"
import NoteBackground from "./NoteBackground"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-full h-screen mx-auto md:w-3/4 lg:w-4/6">
            {children}
            <Navigation />
            <NoteBackground outereRectSize={200} innerRectRowNumber={2} />
        </main>
    )
}

export default Layout
