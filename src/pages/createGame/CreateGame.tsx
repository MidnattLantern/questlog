import Styles from "./CreateGame.module.scss"
import { useState } from "react"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import type { IDraft } from "../../models/draft"
import { baseUrl } from "../../config"

function CreateGame() {
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

    // ====================
    // Functions & handlers
    // ====================
    function handleSetDraft(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement
        setDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    async function handleSubmit(event: React.SubmitEvent) {
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
        } catch (error) {
            console.error('submit error:', error)
            return
        } finally {
            setDisabledSubmitButton(false)
        }
    }
    // ====================

    return (
        <>
            <h2>Create</h2>
            <BackToCollectionButton/>
            <form onSubmit={handleSubmit} className={Styles.form}>
                <label>
                    <span>Title</span>
                    <input type="text" name="title" value={draft.title} onChange={handleSetDraft}/>
                </label>
                <label>
                    <span>Platform</span>
                    <input type="text" name="platform" value={draft.platform} onChange={handleSetDraft}/>
                </label>
                <fieldset>
                    <legend>Stauts</legend>
                    <label>
                        <input type="radio" name="status" value={'playing'} onChange={handleSetDraft}/>
                        <span>Playing</span>
                    </label>
                    <label>
                        <input type="radio" name="status" value={'completed'} onChange={handleSetDraft}/>
                        <span>Completed</span>
                    </label>
                    <label>
                        <input type="radio" name="status" value={'want'} onChange={handleSetDraft}/>
                        <span>Want</span>
                    </label>
                    <label>
                        <input type="radio" name="status" value={'dropped'} onChange={handleSetDraft}/>
                        <span>Dropped</span>
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Rating</legend>
                    <label>
                        <input type="radio" name="rating" value={1} onChange={handleSetDraft}/>
                        <span>1</span>
                    </label>
                    <label>
                        <input type="radio" name="rating" value={2} onChange={handleSetDraft}/>
                        <span>2</span>
                    </label>
                    <label>
                        <input type="radio" name="rating" value={3} onChange={handleSetDraft}/>
                        <span>3</span>
                    </label>
                    <label>
                        <input type="radio" name="rating" value={4} onChange={handleSetDraft}/>
                        <span>4</span>
                    </label>
                    <label>
                        <input type="radio" name="rating" value={5} onChange={handleSetDraft}/>
                        <span>5</span>
                    </label>
                </fieldset>
                <label>
                    <span>Cover image "URL" link</span>
                    <input type="text" name="coverUrl" value={draft.coverUrl} onChange={handleSetDraft}/>
                </label>
                {draft.coverUrl ? <img src={draft.coverUrl} alt="Image preview" width={300}/> : <p>Image Preview</p>}
                <label>
                    <span>Notes</span>
                    <textarea value={draft.notes} name="notes" rows={5} onChange={handleSetDraft}/>
                </label>

                <input type="submit" value={disabledSubmitButton ? 'Creating…' : 'Save & create'} disabled={disabledSubmitButton}/>

                {submitErrorMessage && <p>{submitErrorMessage}</p>}
            </form>
        </>
    )
}

export default CreateGame