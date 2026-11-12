import Styles from "./GameCard.module.scss"
import { NavLink } from "react-router"
import type { IGame } from "../../models/game"

function GameCard({game, preview = false}: {game: IGame, preview?: boolean}) {

    return (
        <div className={Styles.container}>
            <article className={Styles.gameCardContainer}>
                {game.coverUrl && <img src={game.coverUrl} width={300} alt={`Cover image for ${game.title}`} className={Styles.wallpaperAsHero}/>}
                <div className={Styles.titleAndStatus}>
                    <h3>{game.title}</h3>
                    <p>{game.status}</p>
                </div>
                {!preview && <>
                    <p>{game.notes}</p>
                    <p>Platform: {game.platform}</p>
                    <p>Your rating: {game.rating}</p>
                </>}

                {preview ? <NavLink to={`/detail/${game.id}`}>Details</NavLink> : <NavLink to={`/edit/${game.id}`}>Edit</NavLink>}
            </article>
        </div>
    )
}

export default GameCard