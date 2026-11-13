import Styles from './BackToCollectionButton.module.scss'
import { NavLink } from "react-router";

function BackToCollectionButton() {
    return <NavLink to='/' className={Styles.backButton}>Back to collection</NavLink>
}

export default BackToCollectionButton