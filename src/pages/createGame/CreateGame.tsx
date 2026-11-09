// import Styles from "./CreateGame.module.scss"
import { useState } from "react"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import type { IDraft } from "../../models/draft"
import { baseUrl } from "../../config"
import { useNavigate } from "react-router"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"

function CreateGame() {
	// ======
	// States
	// ======
    const navigate = useNavigate()
    const [draft, setDraft] = useState<IDraft>({
        title: '',
        platform: '',
        status: null,
        rating: null,
        coverUrl: '',
        notes: ''
    })
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
	// ======

    // ====================
    // Functions & handlers
    // ====================
    function handleSetDraft(event: React.ChangeEvent) { // consider moving to sessionMemory.ts
        const target = event.target as HTMLInputElement
        console.log(target.name)
        console.log(target.value)
        // target.value is passed as string, some need to be converted to nuber
        if (target.name === 'rating')   setDraft(prev => {return {...prev, [target.name]: Number(target.value)}})
        else                            setDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    async function handleSubmit(event: React.SubmitEvent) { // consider moving to sessionMemory.ts
        setDisabledSubmitButton(true)
        event.preventDefault()
        console.log(event)
        console.log(draft)
        try {
            console.log('attempting submit')
            const response = await fetch(`${baseUrl}`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(draft)
            })
            const data = await response.json()

            if (!response.ok) {
                console.log('response NOT ok', data)
                setSubmitErrorMessage(data.message)
                return
            }

            console.log('response ok', data)
            navigate(`/detail/${data.id}`)

        } catch (error) {
            console.error('submit error:', error)
            return
        } finally {
            setDisabledSubmitButton(false)
        }
    }
    // ====================

	// ======
	// Render
	// ======
    return (
        <>
            <h2>Create</h2>
            <BackToCollectionButton/>
            <EditCreateForm draft={draft} handleSetDraft={handleSetDraft} handleSave={handleSubmit} disabledSubmitButton={disabledSubmitButton} submitButtonText="Create"/>
            {submitErrorMessage && <p>{submitErrorMessage}</p>}
        </>
    )
	// ======
}

export default CreateGame