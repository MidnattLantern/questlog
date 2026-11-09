// import Styles from "./EditGame.module.scss"
import { useNavigate, useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import React, { useEffect, useState } from "react"
import { baseUrl } from "../../config"
import type { IApiFetchStatus } from "../../models/api-fetch-status"
import NonOkResponse from "../../components/nonOkResponse/NonOkResponse"
import type { IDraft } from "../../models/draft"
import EditCreateForm from "../../components/editCreateForm/EditCreateForm"

function EditGame() {
	// ======
	// States
	// ======
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
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
    const [onDeletion, setOnDeletion] = useState<boolean>(false)
    const [confirmDeleteView, setConfirmDeleteView] = useState<boolean>(false)
    // ======

    // ====================
    // Functions & handlers
    // ====================
    function handleSetApiFetchStatus(name: 'isLoading' | 'fetchOk' | 'fetchErrorMessage', value: boolean | string | null) {
        setApiFetchStatus(prev => {return {...prev, [name]: value}})
    }

    function handleSetEditDraft(event: React.ChangeEvent) { // consider moving to sessionMemory.ts
        const target = event.target as HTMLInputElement
        // target.value is passed as string, some need to be converted to nuber
        if (target.name === 'rating')   setEditDraft(prev => {return {...prev, [target.name]: Number(target.value)}})
        else                            setEditDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    async function handleSaveChanges(event: React.SubmitEvent) { // consider moving to sessionMemory.ts
        setDisabledSubmitButton(true)
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
                setSubmitErrorMessage(data.message)
                return
            }

            console.log('Saved changes OK,', data)
            navigate(`/detail/${id}`)
        } catch (error) {
            console.error('Failed to save changes', error)
            return
        } finally {
            setDisabledSubmitButton(false)
        }
    }

    async function handleDeleteGame() {
        setDisabledSubmitButton(true)
        setConfirmDeleteView(false)
        setOnDeletion(true)
        
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
        } finally {
            setDisabledSubmitButton(false)
            setOnDeletion(false)
        }
    }
    // ====================

	// =======
	// Effects
	// =======
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
	// =======

    // ======
	// Render
	// ======
    return (
        <>
            <h2>Edit</h2>
            <BackToCollectionButton/>
            {(!apiFetchStatus.isLoading && apiFetchStatus.fetchOk) ? (
                <EditCreateForm draft={editDraft} handleSetDraft={handleSetEditDraft} handleSave={handleSaveChanges} disabledSubmitButton={disabledSubmitButton} submitButtonText="Save changes" onSubmitButtonText={onDeletion ? 'Save changes' : 'Saving…'}/>
            ) : (
                <NonOkResponse apiFetchStatus={apiFetchStatus}/>
            )}
            {confirmDeleteView ? (
                <>
                    <p>Deleting "{editDraft.title}" cannot be undone, are you sure?</p>
                    <button onClick={() => {setConfirmDeleteView(false)}}>No, cancel</button>
                    <button onClick={handleDeleteGame}>Yes, delete "{editDraft.title}"</button>
                </>
            ) : (
                <button onClick={() => {setConfirmDeleteView(true)}} disabled={disabledSubmitButton}>{onDeletion ? 'Deleting…' : "Delete"}</button>
            )}
            {submitErrorMessage && <p>{submitErrorMessage}</p>}
        </>
    )
    // ======
}

export default EditGame