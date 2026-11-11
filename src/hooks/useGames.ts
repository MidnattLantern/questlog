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

    async function handlePerformCrudOperation({
        method,
        draft = null,
        id = null
    } : {
        method: 'POST' | 'PATCH' | 'DELETE',
        draft?: null | IDraft,
        id?: null | string
    }) {
        setDisabledSubmitButton(true)
        try {
            let idQuery = ''
            if (method === 'PATCH') idQuery = `/${id}`
            if (method === 'DELETE') idQuery = `/${id}`
            const response = await fetch(`${baseUrl}${idQuery}`, {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: (method === 'DELETE') ? null : JSON.stringify(draft) // shouldn't pass body if method don't use it
            })
            const data = await response.json()
            const status = response.status

            console.log('handlePerformCrudOperation data', data)
            console.log('handlePerformCrudOperation status', status)

            if (!response.ok) {
                setErrorMessage(data.message)
                return
            }

            if (method === 'POST') navigate(`/detail/${data.id}`)
            if (method === 'PATCH') navigate(`/detail/${id}`)
            if (method === 'DELETE') navigate('/')
        } catch (error) {
            console.log(`Failed to perform CRUD operation "${method}" - ${error}`)
        } finally {
            setDisabledSubmitButton(false)
        }
    }

    useEffect(() => {
        console.log('useGames useEffect fired')

        if (fetchData) {
            console.log('useGames fetching data')
            localStorage.setItem('gameStatusFilter', JSON.stringify(gameStatusFilter))

            async function handleFetchCollection() { // useEffect won't allow using handlePerformCrudOperation without extra setup
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

                    if (!response.ok) {
                        setErrorMessage(`Failed to fetch collection - server side error code: ${status}`)
                        if (id && status === 404) navigate('*') // without this redirection, user can see detail and edit elements for non existing games
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

    }, [fetchData, gameStatusFilter, id, navigate])

    return {
        isLoading, errorMessage, disabledSubmitButton, // Limbos
        gameCollection, draft, gameStatusFilter, // Data
        handleSetDraft, setGameStatusFilter,
        handlePerformCrudOperation
    }
}

export default useGames