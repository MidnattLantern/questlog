import Styles from "./GameDetail.module.scss"
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

    window.scrollTo(0, 0);

    return (
        <div className={Styles.container}>
            <BackToCollectionButton/>
            <h2>Details</h2>
            <div className={Styles.content}>
                {errorMessage && <p>{errorMessage}</p>}
                {isLoading ? (
                    <Loading/>
                ) : (
                    draft && <GameCard game={draft}/>
                )}
            </div>
        </div>
    )
}

export default GameDetail