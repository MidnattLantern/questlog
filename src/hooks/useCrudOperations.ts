import { useEffect, useState } from "react"
import { baseUrl } from "../config"
import type { IDraft } from "../models/draft"
import { useNavigate } from "react-router"

function useCrudOperations(id: null | string = null) { // passing id implies edit or delete mode
    const navigate = useNavigate()
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
    const [draftErrorMessage, setDraftErrorMessage] = useState<string | null>(null) // consider merging this with submitErrorMessage
    const [fetckOk, setFetchOk] = useState<boolean>(false)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
    const [draft, setDraft] = useState<IDraft>({
        title: '',
        platform: '',
        status: null,
        rating: null,
        coverUrl: '',
        notes: ''
    })

    function handleSetDraft(event: React.ChangeEvent) {
        const target = event.target as HTMLInputElement
        // target.value is passed as string, some need to be converted to nuber
        if (target.name === 'rating')   setDraft(prev => {return {...prev, [target.name]: Number(target.value)}})
        else                            setDraft(prev => {return {...prev, [target.name]: target.value}})
    }

    async function handleCreateGame(draft: IDraft) {
        setDisabledSubmitButton(true)
        console.log('handle create game')
        try {
            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(draft)
            })
            const data = await response.json()
            const status = response.status
            
            console.log('create data', data)
            console.log('create status', status)

            if (status === 201) { // consider response.ok
                setSubmitErrorMessage(null)
                navigate(`/detail/${data.id}`)
            } else if (status === 404) {
                setSubmitErrorMessage('Failed to create game because of a database server side error–invalid fetch URL')
            } else {
                setSubmitErrorMessage(data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setDisabledSubmitButton(false)
        }
    }

    async function handlePatchGame(event: React.SubmitEvent) {
        event.preventDefault()
        setDisabledSubmitButton(true)
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PATCH',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(draft)
            })
            const data = await response.json()
            const status = response.status

            console.log('patch data', data)
            console.log('patch status', status)

            if (!response.ok) {
                setSubmitErrorMessage(data.message)
                return
            }
            navigate(`/detail/${id}`)
        } catch (error) {
            console.error(error)
        } finally {
            setDisabledSubmitButton(false)
        }

    }

    async function handleDeleteGame() {
        setDisabledSubmitButton(true)
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            const status = response.status

            console.log('delete data', data)
            console.log('delete status', status)

            if (!response.ok) {
                setSubmitErrorMessage(`Failed to delete game–${data.message}`)
                return
            }

            console.log('Delete game OK', data)
            navigate('/')
        } catch (error) {
            console.error(error)
        } finally {
            setDisabledSubmitButton(false)
        }
    }

    useEffect(() => {
        async function handleFetchGame() {
            setDisabledSubmitButton(true)
            try {
                const response = await fetch(`${baseUrl}/${id}`)
                const data = await response.json()
                const status = response.status

                console.log('fetch data', data)
                console.log('fetch status', status)

                if (status === 200) {
                    setFetchOk(true)
                    setDraft(data)
                } else if (status === 404) {
                    setDraftErrorMessage(data.message)
                } else {
                    setDraftErrorMessage(`Failed to load game–${data.message}`)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setDisabledSubmitButton(false)
            }
        }
        if (id) { // passing id implies edit or delete mode
            console.log('patching:', id)
            handleFetchGame()
        }
    }, [id])

    return {
        handleSetDraft,
        handleCreateGame,
        handlePatchGame,
        handleDeleteGame,
        submitErrorMessage,
        draftErrorMessage,
        fetckOk,
        disabledSubmitButton,
        draft
    }
}

export default useCrudOperations