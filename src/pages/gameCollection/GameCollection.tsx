import { useEffect, useState } from "react"
import type { IGame } from "../../models/game"
import { baseUrl, gameStatusOptions } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import type { IApiFetchStatus } from "../../models/api-fetch-status"
import NonOkResponse from "../../components/nonOkResponse/NonOkResponse"
import useGames from "../../hooks/useGames"

function GameCollection() {
	// ======
	// States
	// ======
	const [gameStatusFilter, setGameStatusFilter] = useGames()
	const [games, setGames] = useState<IGame[]>([])
	const [apiFetchStatus, setApiFetchStatus] = useState<IApiFetchStatus>({
		// NOTE: Use the handleSetApiFetchStatus function to set the status
		isLoading: true,
		fetchOk: false,
		fetchErrorMessage: null
	})
	// ======

	// ====================
	// Functions & handlers
	// ====================
	function handleSetApiFetchStatus(name: 'isLoading' | 'fetchOk' | 'fetchErrorMessage', value: boolean | string | null) {
		setApiFetchStatus(prev => {return {...prev, [name]: value}})
	}

	function handleChangeGameStatus(e: React.ChangeEvent) {
		handleSetApiFetchStatus('isLoading', true)
		setGameStatusFilter((e.target as HTMLSelectElement).value)
		handleSetApiFetchStatus('isLoading', false)
	}
	// ====================

	// =======
	// Effects
	// =======
	useEffect(() => {
		async function handleFetchGames() {
			try {
				let statusQuery: string = ''
				if (gameStatusFilter) statusQuery = `?status=${gameStatusFilter}`
				const response = await fetch(`${baseUrl}${statusQuery}`)
				const data = await response.json()
				const status = response.status
				return {data, status}
			} catch (error) {
				console.error(error)
				return
			}
		}

		handleFetchGames()
		.then((fetched) => {
			if (fetched?.status === 200) {
				setGames(fetched.data)
				handleSetApiFetchStatus('fetchOk', true)
			} else {
				console.error('Failed to fetch data. Error code:', fetched?.status)
				handleSetApiFetchStatus('fetchErrorMessage', `Failed to fetch data. Error code: ${fetched?.status}`)
			}
		})
		.finally(() => {
			handleSetApiFetchStatus('isLoading', false)
		})
	}, [gameStatusFilter])
	// =======

	// ======
	// Render
	// ======
	return (
		<>
			<p>gameStatusFilter: {gameStatusFilter}</p>
			<select defaultValue={gameStatusFilter ? gameStatusFilter : ''} onChange={handleChangeGameStatus}>
				<option value={''}>All</option>
				{gameStatusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			<div>
				{(!apiFetchStatus.isLoading && apiFetchStatus.fetchOk) ? (
					games.map(game => (<GameCard key={game.id} game={game} preview={true}/>))
				) : (
					<NonOkResponse apiFetchStatus={apiFetchStatus} loadingMessage="Your game collection is loading…"/>
				)}
			</div>
		</>
	)
	// ======
}

export default GameCollection