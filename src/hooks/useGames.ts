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

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)
    const [gameCollection, setGameCollection] = useState<IGame[] | null>(null)
    const [draft, setDraft] = useState<IDraft>({ // Also functional for single game as read only
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

    async function handlePerformCrudOperation({ // currently only works for POST and PATCH
        method,
        draft = null,
        id = null
    } : {
        method: 'POST' | 'PATCH' | 'DELETE',
        draft?: null | IDraft,
        id?: null | string
    }) {
        setIsLoading(true)
        setDisabledSubmitButton(true)
        try {
            let idQuery = ''
            if (method === 'PATCH') idQuery = `/${id}`
            const response = await fetch(`${baseUrl}${idQuery}`, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(draft)
            })
            const data = await response.json()
            const status = await response.status

            console.log('handlePerformCrudOperation data', data)
            console.log('handlePerformCrudOperation status', status)

            if (!response.ok) {
                setErrorMessage(data.message)
                return
            }

            if (method === 'POST') navigate(`/detail/${data.id}`)
            if (method === 'PATCH') navigate(`/detail/${id}`)
        } catch (error) {
            console.log(`Failed to perform CRUD operation "${method}" - ${error}`)
        } finally {
            setIsLoading(false)
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
                setErrorMessage(`Failed to delete game–${data.message}`)
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

                    // setFetchOk(response.ok)
                    if (!response.ok) {
                        setErrorMessage(`Failed to fetch collection - server side error code: ${status}`)
                        return
                    }

                    if (id) setDraft(data) // if id is passed, that means the hook should handle a single game
                    else setGameCollection(data)
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
        // fetckOk,
        disabledSubmitButton,
        handleDeleteGame,
        handleSetDraft,
        gameCollection, errorMessage, isLoading, draft,
        gameStatusFilter, setGameStatusFilter,
        handlePerformCrudOperation
    }
}

export default useGames