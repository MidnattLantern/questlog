import { Outlet } from "react-router"
import NavBar from "../components/navBar/NavBar"

function RootLayout() {
    return (
        <>
            <NavBar/>
            <main tabIndex={0} id='navBarTabDestination'>
                <Outlet/>
            </main>
            <footer>

            </footer>
        </>
    )
}

export default RootLayout