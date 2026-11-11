import { useEffect, useState } from "react";
import type { IGame } from "../models/game";
import { baseUrl } from "../config";
import type { IDraft } from "../models/draft";
import { useNavigate } from "react-router";

function useGames({
    fetchData = false,
    id = null
} : {
    fetchData?: boolean,
    id?: null | string
} = {}) {
    const navigate = useNavigate()
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
    const [draftErrorMessage, setDraftErrorMessage] = useState<string | null>(null) // consider merging this with submitErrorMessage
    const [fetckOk, setFetchOk] = useState<boolean>(false)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [gameCollection, setGameCollection] = useState<IGame[] | null>(null)
    const [draft, setDraft] = useState<IDraft>({ // Also functional for read only
        title: '',
        platform: '',
        status: null,
        rating: null,
        coverUrl: '',
        notes: ''
    })

    const [gameStatusFilter, setGameStatusFilter] = useState<string>(() => {
        const storage = localStorage.getItem('gameStatusFilter')
        if (!storage) return '' // App might break if nothing in storage isn't addressed and set as empty string
        else return JSON.parse(storage)
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
            
            console.log('handleCreateGame data', data)
            console.log('handleCreateGame status', status)

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

            console.log('handlePatchGame data', data)
            console.log('handlePatchGame status', status)

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

            console.log('handleDeleteGame data', data)
            console.log('handleDeleteGame status', status)

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
        console.log('useGames useEffect fired')

        if (fetchData) {
            console.log('useGames fetching data')
            localStorage.setItem('gameStatusFilter', JSON.stringify(gameStatusFilter))

            async function handleFetchCollection() {
                setIsLoading(true)
                try {
                    let statusQuery: string = ''
                    if (gameStatusFilter) statusQuery = `?status=${gameStatusFilter}`
                    if (id) statusQuery = `/${id}` // getting a single game also overrides gameStatusFilter
                    const response = await fetch(`${baseUrl}${statusQuery}`)
                    const data = await response.json()
                    const status = response.status

                    console.log('handleFetchCollection data:', data)
                    console.log('handleFetchCollection status:', status)

                    if (status === 200) {
                        if (id) { // if id is passed, that means the hook should handle a single game
                            setDraft(data)
                            setFetchOk(true)
                        } else {
                            setGameCollection(data)
                        }
                    } else if (status === 404) {
                        setDraftErrorMessage(data.message)
                    } else {
                        // These two might need to be merged
                        setErrorMessage(`Failed to fetch collection - server side error code: ${status}`)
                        setDraftErrorMessage(`Failed to load game–${data.message}`)
                    }
                } catch (error) {
                    console.error('error:', error)
                    return
                } finally {
                    setIsLoading(false)
                }
            }

            handleFetchCollection()
        }

    }, [fetchData, gameStatusFilter, id])

    return {
        submitErrorMessage, draftErrorMessage, fetckOk, disabledSubmitButton,
        handleDeleteGame, handlePatchGame, handleCreateGame, handleSetDraft,
        gameCollection, errorMessage, isLoading, draft,
        gameStatusFilter, setGameStatusFilter
    }
}

export default useGames