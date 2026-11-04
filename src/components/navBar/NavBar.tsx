import Styles from './NavBar.module.scss'
import { NavLink } from "react-router"

function NavBar() {
    return  (
        <nav className={Styles.wrapper}>
            <h1><NavLink to='/'>Questlog</NavLink></h1>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='create'>Create</NavLink>
            <a href="https://midnattlantern.github.io/portfolio/" target="_blank">More by Midnatt Lantern</a>
        </nav>
    )
}

export default NavBar