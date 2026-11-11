// import Styles from "./EditGame.module.scss"
import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import useGames from "../../hooks/useGames"

function EditGame() {
	// ======
	// States
	// ======
    const { id } = useParams()
    const { handlePatchGame, handleDeleteGame,
        // submitErrorMessage, draftErrorMessage,
        errorMessage,
        handleSetDraft, fetckOk, draft, disabledSubmitButton } = useGames({id: id, fetchData: true})
    // ======

    // ====================
    // Functions & handlers
    // ====================

    // ====================

	// =======
	// Effects
	// =======

	// =======

    // ======
	// Render
	// ======
    return (
        <>
            <h2>Edit</h2>
            <BackToCollectionButton/>
            {errorMessage && <p>{errorMessage}</p>}
            {fetckOk && <EditCreateForm draft={draft} handleSetDraft={handleSetDraft} handleSave={handlePatchGame} disabledSubmitButton={disabledSubmitButton} submitButtonText="Save changes"/>}
            <button onClick={handleDeleteGame} disabled={disabledSubmitButton}>Delete</button>
        </>
    )
    // ======
}

export default EditGame