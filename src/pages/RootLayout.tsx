import { Outlet } from "react-router"

function RootLayout() {
    return (
        <>
            <header>
                <h1>Questlog</h1>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout