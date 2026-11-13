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
                <p>Developed by Alma Isaksson – 2026</p>
            </footer>
        </>
    )
}

export default RootLayout