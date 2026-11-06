import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import { baseUrl } from "../../config"
import { useEffect, useState } from "react"
import type { IGame } from "../../models/game"
import type { IApiFetchStatus } from "../../models/api-fetch-status"
import NonOkResponse from "../../components/nonOkResponse/NonOkResponse"
import GameCard from "../../components/gameCard/GameCard"

function GameDetail() {
    const { id } = useParams()
    const [game, setGame] = useState<IGame>()
    const [apiFetchStatus, setApiFetchStatus] = useState<IApiFetchStatus>({
        // NOTE: Use the handleSetApiFetchStatus function to set the status
        isLoading: true,
        fetchOk: false,
        fetchErrorMessage: null
    })

	function handleSetApiFetchStatus(name: 'isLoading' | 'fetchOk' | 'fetchErrorMessage', value: boolean | string | null) {
		setApiFetchStatus(prev => {return {...prev, [name]: value}})
	}
    // ====================

    useEffect(() => {
        async function handleFetchGame() {
            try {
                const response = await fetch(`${baseUrl}/${id}`)
                const data = await response.json()
                const status = response.status
                return {data, status}
            } catch (error) {
                console.error(error)
                return
            }
        }

        handleFetchGame()
        .then((fetched) => {
            if (fetched?.status === 200) {
                setGame(fetched.data)
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
            <h2>Game detail</h2>
            <BackToCollectionButton/>
            <p>ID in question: {id}</p>
            <div>
                {(!apiFetchStatus.isLoading && apiFetchStatus.fetchOk) ? (
                    <>
                        {game && <GameCard game={game}/>}
                    </>
                ) : (
                    <>
                        <NonOkResponse apiFetchStatus={apiFetchStatus}/>
                    </>
                )}
            </div>
        </>
    )
}

export default GameDetail