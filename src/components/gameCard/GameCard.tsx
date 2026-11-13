import Styles from "./GameCard.module.scss"
import "./wallpaper-placeholder.scss"
import "./rating-icon.scss"
import { NavLink } from "react-router"
import type { IGame } from "../../models/game"
import WallpaperPlaceholder from "../../assets/wallpaper-placeholder.svg?react"
import RatingIcon from "../../assets/rating-icon.svg?react"

function GameCard({game, preview = false}: {game: IGame, preview?: boolean}) {

    return (
        <div className={`${Styles.container} ${!preview && Styles.containerForDetail}`}>
            <article className={Styles.gameCardContainer}>
                {game.coverUrl ? (
                    <img src={game.coverUrl} width={300} alt={`Grayscaled and darkened version of ${game.title} wallpaper`} className={Styles.wallpaperAsBackground}/>
                ) : (
                    <WallpaperPlaceholder className={Styles.wallpaperAsBackground}/>
                )}
                {game.coverUrl ? (
                    <img src={game.coverUrl} width={300} alt={`Cover image for ${game.title}`} className={Styles.wallpaperAsHero}/>
                ) : (
                    <WallpaperPlaceholder className={Styles.wallpaperAsHero}/>
                )}
                <div className={Styles.titleAndStatus}>
                    <h3>{game.title}</h3>
                    {game.status && <p>{game.status}</p>}
                </div>

                {!preview && <div className={Styles.detailedNotes}>
                    <p className={Styles.notes}>{game.notes}</p>
                    <div className={Styles.platformAndRating}>
                        <p>{game.platform}</p>
                        <div aria-label={`Game is rated ${game.rating} out of 5`}>
                            {Array.from({ length: Number(game.rating) }).map((_, index) => (
                                <RatingIcon key={index} className={Styles.ratingIcon}/>
                            ))}
                        </div>
                    </div>
                </div>}

            </article>
            {preview ? <NavLink to={`/detail/${game.id}`} className={Styles.OpenButton}>Details</NavLink> : <NavLink to={`/edit/${game.id}`} className={Styles.OpenButton}>Edit</NavLink>}
        </div>
    )
}

export default GameCard