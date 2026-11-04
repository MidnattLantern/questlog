import { Outlet } from "react-router"
import NavBar from "../components/navBar/NavBar"

function RootLayout() {
    return (
        <>
            <header>
                <NavBar/>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default RootLayout