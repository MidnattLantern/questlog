import Styles from './NavBar.module.scss'
import { NavLink } from "react-router"
import QuestlogLogo from "../../assets/questlog-logo.svg?react"
import RoundArrow from "../../assets/round-arrow.svg?react"
import { useState } from 'react'
import NewTabIcon from "../../assets/newtab-icon.svg?react"

function NavBar() {
    const [showNavBar, setShowNavBar] = useState<boolean>(false)

    function handleToggleShowNavBar() {
        setShowNavBar(!showNavBar)
    }

    function handleHideNavBar() {
        setShowNavBar(false)
        document.getElementById("navBarTabDestination")?.focus() // Specify element to focus for better UX for a11y
    }

    return  (
        <header className={`${Styles.container} ${!showNavBar && Styles.containerNoEvents}`} onClick={showNavBar ? handleHideNavBar : undefined}>

            <button onClick={handleToggleShowNavBar} className={`${Styles.toggleNavBarButton} ${showNavBar ? Styles.expandedNavBarButton : ""}`}>
                <h1>
                    <QuestlogLogo aria-label='Questlog logo' className={Styles.logoAppearance}/>
                    <span className={Styles.logoA11y}>Questlog</span>
                </h1>
                <RoundArrow className={`${Styles.roundArrow} ${showNavBar ? Styles.roundArrowLeft : ""}`}/>
            </button>

            <nav className={showNavBar ? Styles.navIsVisible : Styles.navIsHidden}>
                <NavLink to='/' className={Styles.logoWideViewPort}>
                    <QuestlogLogo aria-label='Questlog logo' className={Styles.logoAppearance}/>
                    <span className={Styles.logoA11y}>Questlog</span>
                </NavLink>

                <NavLink to='/'><span>Home</span></NavLink>
                <NavLink to='create'><span>Create</span></NavLink>
                <a href="https://midnattlantern.github.io/portfolio/" target="_blank" className={Styles.moreByLink}>
                    <span>More by </span>
                    <span>Midnatt Lantern</span>
                    <NewTabIcon className={Styles.newTabIcon}/>
                </a>
            </nav>
        </header>
    )
}

export default NavBar