import Navigation from "./Navigation"
import NoteBackground from "./NoteBackground"

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-col items-center justify-center p-8 mx-auto layout">
            <div className="flex flex-col items-start justify-center w-full h-full gap-4">
                {children}
            </div>
            <Navigation />
            <NoteBackground rectSize={150} />
        </main>
    )
}

export default Layout
