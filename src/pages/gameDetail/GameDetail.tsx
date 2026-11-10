import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"

function GameDetail() {
    const { id } = useParams()
    const { game, errorMessage, isLoading } = useGames({id})

    return (
        <>
            <h2>Game detail</h2>
            <BackToCollectionButton/>
            <p>ID in question: {id}</p>
            <div>
                {isLoading && <p>loading…</p>}
                {errorMessage && <p>{errorMessage}</p>}
                {game && <GameCard game={game}/>}
            </div>
        </>
    )
}

export default GameDetail