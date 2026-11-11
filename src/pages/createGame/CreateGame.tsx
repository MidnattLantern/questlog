// import Styles from "./CreateGame.module.scss"
import { useState } from "react"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import type { IDraft } from "../../models/draft"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"
import useGames from "../../hooks/useGames"
// import useCrudOperations from "../../hooks/useCrudOperations"

function CreateGame() {
	// ======
	// States
	// ======
    // const {
    //     handleCreateGame,
    //     submitErrorMessage,
    //     disabledSubmitButton
    // } = useCrudOperations()
    const {
        handleCreateGame,
        submitErrorMessage,
        disabledSubmitButton
    } = useGames()
    const [draft, setDraft] = useState<IDraft>({
        title: '',
        platform: '',
        status: null,
        rating: null,
        coverUrl: '',
        notes: ''
    })
	// ======

    // ====================
    // Functions & handlers
    // ====================
    function handleSetDraft(event: React.ChangeEvent) { // consider moving to sessionMemory.ts
        const target = event.target as HTMLInputElement
        // target.value is passed as string, some need to be converted to nuber
        if (target.name === 'rating')   setDraft(prev => {return {...prev, [target.name]: Number(target.value)}})
        else                            setDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    function handleSubmit(event: React.SubmitEvent) { // consider moving to sessionMemory.ts
        event.preventDefault()
        handleCreateGame(draft)       
    }
    // ====================

	// ======
	// Render
	// ======
    return (
        <>
            <h2>Create</h2>
            <BackToCollectionButton/>
            <EditCreateForm draft={draft} handleSetDraft={handleSetDraft} handleSave={handleSubmit} disabledSubmitButton={disabledSubmitButton} submitButtonText="Create & save" onSubmitButtonText="Creating…"/>
            {submitErrorMessage && <p>{submitErrorMessage}</p>}
        </>
    )
	// ======
}

export default CreateGame