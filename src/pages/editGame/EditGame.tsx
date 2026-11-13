import Styles from "./EditGame.module.scss"
import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import useGames from "../../hooks/useGames"
import Loading from "../../components/loading/Loading"
import { useState } from "react"
import ErrorMessage from "../../components/errorMessage/ErrorMessage"

function EditGame() {
    const { id } = useParams()
    const {
        errorMessage, draft, isLoading, disabledSubmitButton,
        handlePerformCrudOperation, handleSetDraft, setErrorMessage
    } = useGames({id: id, fetchData: true})
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    /** About submitDeleteAction:
     * you don't want save submit button to say "saving…" when performing a delete,
     * you don't want delete submit button to say "deleting…" when performing a patch,
     * submitDeleteAction makes it possible to maintain decent UX, although through convoluted logic.
     */
    const [submitDeleteAction, setSubmitDeleteAction] = useState<boolean>(false)

    function handleSubmit(event: React.SubmitEvent) {
        event.preventDefault()
        handlePerformCrudOperation({method: 'PATCH', draft: draft, id: id})
    }

    function handleDelete() {
        setSubmitDeleteAction(true)
        handlePerformCrudOperation({method: 'DELETE', id: id})
        setConfirmDelete(false)
    }

    function handleDismissError() {
        setErrorMessage(null)
    }

    return (
        <div className={`${Styles.container} ${errorMessage ? Styles.roomForErrorMessage : undefined}`}>
            <BackToCollectionButton/>
            <h2>Edit</h2>
            {isLoading ? (
                <Loading/>
            ) : (
                <>
                    <EditCreateForm
                    draft={draft}
                    handleSetDraft={handleSetDraft}
                    handleSave={handleSubmit}
                    disabledSubmitButton={disabledSubmitButton}
                    submitButtonText="Save changes"
                    onSubmitButtonText={submitDeleteAction ? 'Save changes' : 'Saving…'}
                    />
                    {confirmDelete ? (
                        <>
                            <p className={Styles.confirmAlertText}>Deleting "{draft.title}" cannot be undone, are you sure?</p>
                            <button onClick={() => {setConfirmDelete(false)}} className={Styles.cancelDeleteButton}>No, cancel</button>
                            <button onClick={handleDelete} disabled={disabledSubmitButton} className={Styles.deleteButton}>Yes, delete {draft.title}</button>
                        </>
                    ) : (
                        <button onClick={() => {setConfirmDelete(true)}} disabled={disabledSubmitButton} className={Styles.deleteButton}>{submitDeleteAction ? 'Deleting…' : 'Delete'}</button>
                    )}
                </>
            )}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} handleDismissError={handleDismissError}/>}
        </div>
    )
}

export default EditGame