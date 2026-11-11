import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"
import Loading from "../../components/loading/Loading"

function GameDetail() {
    const { id } = useParams()
    const {
        errorMessage, draft, isLoading // Reminder: "draft" also serves as read-only data for a single object
    } = useGames({id: id, fetchData: true})

    return (
        <>
            <h2>Game detail</h2>
            <BackToCollectionButton/>
            {errorMessage && <p>{errorMessage}</p>}
            {isLoading ? (
                <Loading/>
            ) : (
                draft && <GameCard game={draft}/>
            )}
        </>
    )
}

export default GameDetail