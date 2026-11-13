import Styles from "./GameDetail.module.scss"
import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"
import Loading from "../../components/loading/Loading"
import ErrorMessage from "../../components/errorMessage/ErrorMessage"

function GameDetail() {
    const { id } = useParams()
    const {
        errorMessage, draft, isLoading, setErrorMessage // Reminder: "draft" also serves as read-only data for a single object
    } = useGames({id: id, fetchData: true})

    function handleDismissError() {
        setErrorMessage(null)
    }

    window.scrollTo(0, 0);

    return (
        <div className={`${Styles.container} ${errorMessage ? Styles.roomForErrorMessage : undefined}`}>
            <BackToCollectionButton/>
            <h2>Details</h2>
            <div className={Styles.content}>
                {isLoading ? (
                    <Loading/>
                ) : (
                    draft && <GameCard game={draft}/>
                )}
            </div>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} handleDismissError={handleDismissError}/>}
        </div>
    )
}

export default GameDetail