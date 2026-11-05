import { NavLink } from "react-router"
import type { IGame } from "../../models/game"

function GameCard({game, preview = false}: {game: IGame, preview?: boolean}) {

    return (
        <article>
            <h3>{game.title}</h3>
            <p>{game.status}</p>
            <p>{game.notes}</p>
            <p>Platform: {game.platform}</p>
            <p>Your rating: {game.rating}</p>
            <img src={game.coverUrl} width={300} alt={`Cover image for ${game.title}`}/>
            {preview ? <NavLink to={`detail/${game.id}`}>Details</NavLink> : undefined}
        </article>
    )
}

export default GameCard