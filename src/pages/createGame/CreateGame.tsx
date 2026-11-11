// import Styles from "./CreateGame.module.scss"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import useGames from "../../hooks/useGames"

function CreateGame() {
    const {
        errorMessage, draft, disabledSubmitButton,
        handlePerformCrudOperation, handleSetDraft
    } = useGames()

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()
        handlePerformCrudOperation({method: 'POST', draft: draft})
    }
    return (
        <>
            <h2>Create</h2>
            <BackToCollectionButton/>
            {errorMessage && <p>{errorMessage}</p>}
            <EditCreateForm
                draft={draft}
                handleSetDraft={handleSetDraft}
                handleSave={handleSubmit}
                disabledSubmitButton={disabledSubmitButton}
                submitButtonText="Create & save"
                onSubmitButtonText="Creating…"
            />
        </>
    )
}

export default CreateGame