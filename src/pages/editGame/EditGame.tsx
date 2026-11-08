import Styles from "./EditGame.module.scss"
import { useNavigate, useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import React, { useEffect, useState } from "react"
import { baseUrl } from "../../config"
import type { IApiFetchStatus } from "../../models/api-fetch-status"
import NonOkResponse from "../../components/nonOkResponse/NonOkResponse"
import type { IDraft } from "../../models/draft"

function EditGame() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [editDraft, setEditDraft] = useState<IDraft>({
        title: '',
        platform: '',
        status: null,
        rating: null,
        coverUrl: '',
        notes: ''
    })
    const [apiFetchStatus, setApiFetchStatus] = useState<IApiFetchStatus>({
        // NOTE: Use the handleSetApiFetchStatus function to set the status
        isLoading: true,
        fetchOk: false,
        fetchErrorMessage: null
    })
    const [confirmDeleteView, setConfirmDeleteView] = useState<boolean>(false)

    function handleSetApiFetchStatus(name: 'isLoading' | 'fetchOk' | 'fetchErrorMessage', value: boolean | string | null) {
        setApiFetchStatus(prev => {return {...prev, [name]: value}})
    }

    function handleSetEditDraft(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement
        // target.value is passed as string, some need to be converted to nuber
        if (target.name === 'rating')   setEditDraft(prev => {return {...prev, [target.name]: Number(target.value)}})
        else                            setEditDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    async function handleSaveChanges(event: React.SubmitEvent) {
        event.preventDefault()
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(editDraft)
            })
            const data = await response.json()

            if (!response.ok) {
                console.error('Failed to save changes,', data)
                return
            }

            console.log('Saved changes OK,', data)
            navigate(`/detail/${id}`)
        } catch (error) {
            console.error('Failed to save changes', error)
            return
        }
    }

    async function handleDeleteGame() {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

            if (!response.ok) {
                console.error('Failed to delete game,', data)
                return
            }

            console.log('Delete game OK', data)
            navigate('/')
        } catch (error) {
            console.log(error)
            return
        }
    }

    useEffect(() => {
        async function handleFetchGame() {
            try {
                const response = await fetch(`${baseUrl}/${id}`)
                const data = await response.json()
                const status = response.status
                return {data, status}
            } catch (error) {
                console.log(error)
                return
            }
        }

        handleFetchGame()
        .then((fetched) => {
            if (fetched?.status === 200) {
                setEditDraft(fetched.data)
                handleSetApiFetchStatus('fetchOk', true)
            } else {
				handleSetApiFetchStatus('fetchErrorMessage', `Failed to fetch data. Error code: ${fetched?.status}`)
            }
        })
        .finally(() => {
            handleSetApiFetchStatus('isLoading', false)
        })
    }, [id])

    return (
        <>
            <h2>Edit</h2>
            <BackToCollectionButton/>
                {(!apiFetchStatus.isLoading && apiFetchStatus.fetchOk) ? (
                    <form className={Styles.form} onSubmit={handleSaveChanges}>
                        <label>
                            <span>Title</span>
                            <input type="text" name="title" value={editDraft.title} onChange={handleSetEditDraft}/>
                        </label>
                        <label>
                            <span>Platform</span>
                            <input type="text" name="platform" value={editDraft.platform} onChange={handleSetEditDraft}/>
                        </label>
                        <fieldset>
                            <legend>Stauts</legend>
                            <label>
                                <input type="radio" name="status" value={'playing'} checked={editDraft.status === 'playing'} onChange={handleSetEditDraft}/>
                                <span>Playing</span>
                            </label>
                            <label>
                                <input type="radio" name="status" value={'completed'} checked={editDraft.status === 'completed'} onChange={handleSetEditDraft}/>
                                <span>Completed</span>
                            </label>
                            <label>
                                <input type="radio" name="status" value={'want'} checked={editDraft.status === 'want'} onChange={handleSetEditDraft}/>
                                <span>Want</span>
                            </label>
                            <label>
                                <input type="radio" name="status" value={'dropped'} checked={editDraft.status === 'dropped'} onChange={handleSetEditDraft}/>
                                <span>Dropped</span>
                            </label>
                        </fieldset>
                        <fieldset>
                            <legend>Rating</legend>
                            <label>
                                <input type="radio" name="rating" value={1} checked={editDraft.rating === 1} onChange={handleSetEditDraft}/>
                                <span>1</span>
                            </label>
                            <label>
                                <input type="radio" name="rating" value={2} checked={editDraft.rating === 2} onChange={handleSetEditDraft}/>
                                <span>2</span>
                            </label>
                            <label>
                                <input type="radio" name="rating" value={3} checked={editDraft.rating === 3} onChange={handleSetEditDraft}/>
                                <span>3</span>
                            </label>
                            <label>
                                <input type="radio" name="rating" value={4} checked={editDraft.rating === 4} onChange={handleSetEditDraft}/>
                                <span>4</span>
                            </label>
                            <label>
                                <input type="radio" name="rating" value={5} checked={editDraft.rating === 5} onChange={handleSetEditDraft}/>
                                <span>5</span>
                            </label>
                        </fieldset>
                        <label>
                            <span>Cover image "URL" link</span>
                            <input type="text" name="coverUrl" value={editDraft.coverUrl} onChange={handleSetEditDraft}/>
                        </label>
                        {editDraft.coverUrl ? <img src={editDraft.coverUrl} alt="Image preview" width={300}/> : <p>Image Preview</p>}
                        <label>
                            <span>Notes</span>
                            <textarea value={editDraft.notes} name="notes" rows={5} onChange={handleSetEditDraft}/>
                        </label>
                        <input type="submit" value={'Save changes'}/>
                    </form>
                ) : (
                    <>
                        <NonOkResponse apiFetchStatus={apiFetchStatus}/>
                    </>
                )}
            {confirmDeleteView ? (
                <>
                    <p>Deleting "{editDraft.title}" cannot be undone, are you sure?</p>
                    <button onClick={() => {setConfirmDeleteView(false)}}>No, cancel</button>
                    <button onClick={handleDeleteGame}>Yes, delete "{editDraft.title}"</button>
                </>
            ) : (
                <>
                    <button onClick={() => {setConfirmDeleteView(true)}}>Delete</button>
                </>
            )}
        </>
    )
}

export default EditGame