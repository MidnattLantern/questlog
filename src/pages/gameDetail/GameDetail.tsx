import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"

function GameDetail() {
    const { id } = useParams()
    const {
        errorMessage, draft, isLoading
    } = useGames({id: id, fetchData: true})

    return (
        <>
            <h2>Game detail</h2>
            <BackToCollectionButton/>
            <p>ID in question: {id}</p>
            {isLoading && <p>loading…</p>}
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                {draft && <GameCard game={draft}/>}
            </div>
        </>
    )
}

export default GameDetail