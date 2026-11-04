import Styles from './PageNotFound.module.scss'
import { NavLink } from "react-router"

function PageNotFound() {
    return (
        <div className={Styles.container}>
            <h2>Oops…</h2>
            <p>It looks like you ended up in the Lost Woods</p>
            <img src="https://static0.polygonimages.com/wordpress/wp-content/uploads/chorus/uploads/chorus_asset/file/24645421/TOTK_The_Lost_Woods_Entrance.png" alt="Screenshot from The Legend of Zelda: Breath of the Wild – Lost Woods area" width={300}/>
            <NavLink to='/'>Return to home page</NavLink>
        </div>
    )
}

export default PageNotFound