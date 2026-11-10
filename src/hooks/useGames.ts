import { useEffect, useState } from "react";
import type { IGame } from "../models/game";
import { baseUrl } from "../config";

function useGames<T>(id: null | T = null) {
    // TypeScript won't allow IGame as both single object and array, so game has been split to two
    const [gameCollection, setGameCollection] = useState<IGame[] | null>(null)
    const [game, setGame] = useState<IGame | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [gameStatusFilter, setGameStatusFilter] = useState<string>(() => {
        const storage = localStorage.getItem('gameStatusFilter')
        if (!storage) return '' // App might break if nothing in storage isn't addressed and set as empty string
        else return JSON.parse(storage)
    })

    useEffect(() => {
        localStorage.setItem('gameStatusFilter', JSON.stringify(gameStatusFilter))
        console.log('foo')

        async function handleFetchCollection() {
            setIsLoading(true)
            try {
				let statusQuery: string = ''
				if (gameStatusFilter) statusQuery = `?status=${gameStatusFilter}`
                if (id) statusQuery = `/${id}` // getting a single game also overrides gameStatusFilter
				const response = await fetch(`${baseUrl}${statusQuery}`)
                const data = await response.json()
                const status = response.status
                return {data, status}
            } catch (error) {
                console.error('error:', error)
                return
            }
        }

        handleFetchCollection()
        .then((fetched) => {
            if (fetched?.status === 200) {
                // TypeScript won't allow IGame as both single object and array, so game has been split to two
                if (id) setGame(fetched.data) // if id is passed, that means the hook should handle a single game
                else setGameCollection(fetched.data)
                setErrorMessage(null)
            } else {
                setErrorMessage(`Failed to fetch collection - server side error code: ${fetched?.status}`)
            }
        })
        .finally(() => {
            setIsLoading(false)
        })

    }, [gameStatusFilter, id])

    return {
        gameCollection, game, errorMessage, isLoading,
        gameStatusFilter, setGameStatusFilter
    }
}

export default useGames