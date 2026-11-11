// import Styles from "./EditGame.module.scss"
import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import useGames from "../../hooks/useGames"

function EditGame() {
    const { id } = useParams()
    const {
        handleDeleteGame,
        errorMessage,
        handleSetDraft, draft, disabledSubmitButton,
        handlePerformCrudOperation
    } = useGames({id: id, fetchData: true})

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()
        handlePerformCrudOperation({method: 'PATCH', draft: draft, id: id})
    }

    return (
        <>
            <h2>Edit</h2>
            <BackToCollectionButton/>
            {errorMessage && <p>{errorMessage}</p>}
            <EditCreateForm draft={draft} handleSetDraft={handleSetDraft} handleSave={handleSubmit} disabledSubmitButton={disabledSubmitButton} submitButtonText="Save changes"/>
            <button onClick={handleDeleteGame} disabled={disabledSubmitButton}>Delete</button>
        </>
    )
}

export default EditGame