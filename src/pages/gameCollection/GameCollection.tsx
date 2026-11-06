import { useEffect, useState } from "react"
import type { IGame } from "../../models/game"
import { baseUrl } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import type { IApiFetchStatus } from "../../models/api-fetch-status"
import NonOkResponse from "../../components/nonOkResponse/NonOkResponse"

function GameCollection() {
	// ======
	// States
	// ======
	const [games, setGames] = useState<IGame[]>([])
	const [apiFetchStatus, setApiFetchStatus] = useState<IApiFetchStatus>({
		// NOTE: Use the handleSetApiFetchStatus function to set the status
		isLoading: true,
		fetchOk: false,
		fetchErrorMessage: null
	})
	const [gameStatusOptions, setGameStatusOptions] = useState<string[]>([])
	// ======

	// ====================
	// Functions & handlers
	// ====================
	async function handleFetchGames(statusFilter?: string | null) {
		try {
			let statusQuery: string = ''
			if (statusFilter) statusQuery = `?status=${statusFilter}`
			const response = await fetch(`${baseUrl}${statusQuery}`)
			const data = await response.json()
			const status = response.status
			return {data, status}
		} catch (error) {
			console.error(error)
			return
		}
	}

	function handleSetApiFetchStatus(name: 'isLoading' | 'fetchOk' | 'fetchErrorMessage', value: boolean | string | null) {
		setApiFetchStatus(prev => {return {...prev, [name]: value}})
	}
	// ====================

	// =======
	// Effects
	// =======
	useEffect(() => {
		function handleFetchStatusOptions(games: IGame[]) {
			const options: string[] = []
			games.forEach(game => {
				if (!options.includes(game.status)) options.push(game.status)
			})
			setGameStatusOptions(options)
		}

		handleFetchGames()
		.then((fetched) => {
			if (fetched?.status === 200) {
				setGames(fetched.data)
				handleFetchStatusOptions(fetched.data)
				handleSetApiFetchStatus('fetchOk', true)
			} else {
				console.error('Failed to fetch data. Error code:', fetched?.status)
				handleSetApiFetchStatus('fetchErrorMessage', `Failed to fetch data. Error code: ${fetched?.status}`)
			}
		})
		.finally(() => {
			handleSetApiFetchStatus('isLoading', false)
		})
	}, [])
	// =======

	// ======
	// Render
	// ======
	return (
		<>
			<select onChange={(e: React.ChangeEvent) => {
				handleSetApiFetchStatus('isLoading', true)
				handleFetchGames((e.target as HTMLSelectElement).value)
				.then((fetched) => (
					setGames(fetched?.data)
				))
				.finally(() => {
					handleSetApiFetchStatus('isLoading', false)
				})
			}}>
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