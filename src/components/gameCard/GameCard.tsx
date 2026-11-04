import type { IGame } from "../../models/game"

function GameCard({game}: {game: IGame}) {
    return (
        <article>
            <h3>{game.title}</h3>
            <p>{game.status}</p>
            <p>{game.notes}</p>
            <p>Platform: {game.platform}</p>
            <p>Your rating: {game.rating}</p>
            <img src={game.coverUrl} width={300} alt={`Cover image for ${game.title}`}/>
        </article>
    )
}

export default GameCard