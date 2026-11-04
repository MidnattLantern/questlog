import { useEffect, useState } from "react"
import type { IGame } from "../../models/game"
import { baseUrl } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import type { IApiFetchStatus } from "../../models/api-fetch-status"

function GameCollection() {
	const [games, setGames] = useState<IGame[]>([])
	const [apiFetchStatus, setApiFetchStatus] = useState<IApiFetchStatus>({
		isLoading: true,
		fetchOk: false,
		fetchErrorMessage: null
	})
	const [gameStatusOptions, setGameStatusOptions] = useState<string[]>([])

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
					setApiFetchStatus(prev => {return {...prev, fetchOk: true}})
				} else {
					console.error('Failed to fetch data. Error code:', fetched?.status)
					setApiFetchStatus(prev => {return {...prev, fetchErrorMessage: `Failed to fetch data. Error code: ${fetched?.status}`}})
				}
			})
			.finally(() => {
				setApiFetchStatus(prev => {return {...prev, isLoading: false}})
			})
	}, [])

	return (
		<>
			<select onChange={(e: React.ChangeEvent) => {
				setApiFetchStatus(prev => {return {...prev, isLoading: true}})
				handleFetchGames((e.target as HTMLSelectElement).value)
				.then((fetched) => (
					setGames(fetched?.data)
				))
				.finally(() => {
					setApiFetchStatus(prev => {return {...prev, isLoading: false}})
				})
			}}>
				<option value={''}>All</option>
				{gameStatusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			<div>
				{(!apiFetchStatus.isLoading && apiFetchStatus.fetchOk) ? (
					games.map(game => (<GameCard key={game.id} game={game}/>))
				) : (
					<>
						{apiFetchStatus.fetchErrorMessage ? (
							<p>{apiFetchStatus.fetchErrorMessage}</p>
						) : (
							<p>Your game collection is loading…</p>
						)}
					</>
				)}
			</div>
		</>
	)
}

export default GameCollection