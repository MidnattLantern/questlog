import Styles from "./CreateGame.module.scss"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import ErrorMessage from "../../components/errorMessage/ErrorMessage"
import useGames from "../../hooks/useGames"

function CreateGame() {
    const {
        errorMessage, draft, disabledSubmitButton,
        handlePerformCrudOperation, handleSetDraft, setErrorMessage
    } = useGames()

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()
        handlePerformCrudOperation({method: 'POST', draft: draft})
    }

    function handleDismissError() {
        setErrorMessage(null)
    }

    return (
        <div className={`${Styles.container} ${errorMessage ? Styles.roomForErrorMessage : undefined}`}>
            <BackToCollectionButton/>
            <h2>Create</h2>
            <EditCreateForm
                draft={draft}
                handleSetDraft={handleSetDraft}
                handleSave={handleSubmit}
                disabledSubmitButton={disabledSubmitButton}
                submitButtonText="Create & save"
                onSubmitButtonText="Creating…"
            />
            {errorMessage && <ErrorMessage errorMessage={errorMessage} handleDismissError={handleDismissError}/>}
        </div>
    )
}

export default CreateGame