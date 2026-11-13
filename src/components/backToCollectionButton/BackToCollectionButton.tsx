import Styles from './BackToCollectionButton.module.scss'
import { NavLink } from "react-router";
import BackIcon from "../../assets/back-icon.svg?react"

function BackToCollectionButton() {
    return <NavLink to='/' className={Styles.backButton}>
        <BackIcon className={Styles.backIcon}/>
        <span>Back to collection</span>
    </NavLink>
}

export default BackToCollectionButton