import { useEffect, useState } from "react"
import type { IGame } from "../../models/game"
import { baseUrl } from "../../config"

function GameCollection() {
	const [games, setGames] = useState<IGame[]>([])
	const [loading, setLoading] = useState(true)
	const [statusOptions, setGameStatusOptions] = useState<string[]>([])

	async function handleFetchGames(statusFilter?: string | null) {
		console.log('foo')
		try {
			let statusQuery: string = ''
			if (statusFilter) statusQuery = `?status=${statusFilter}`
			const response = await fetch(`${baseUrl}${statusQuery}`)
			console.log('status', response.status)
			const data = await response.json()
			const status = response.status
			return {data, status}
		} catch (error) {
			console.log(error)
			return
		}
	}

	useEffect(() => {
		function handleFetchStatusOptions(games: IGame[]) {
			const statusOptions: string[] = []
			games.forEach(game => {
				if (!statusOptions.includes(game.status)) statusOptions.push(game.status)
			})
			setGameStatusOptions(statusOptions)
		}

		handleFetchGames()
			.then((fetched) => {
				if (fetched?.status === 200) setGames(fetched.data)
				if (fetched?.status === 200) handleFetchStatusOptions(fetched.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [])

	return (
		<>
			<select onChange={(e: React.ChangeEvent) => {
				setLoading(true)
				handleFetchGames((e.target as HTMLSelectElement).value)
				.then((fetched) => (
					setGames(fetched?.data)
				))
				.finally(() => {
					setLoading(false)
				})
			}}>
				<option value={''}>All</option>
				{statusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			<ul>
			{loading ? (
				<>
					<p>Loading</p>
				</>
			) : (
				<>
					{games.map(game => (
						<li key={game.id}>
							<ul>
								<li>{game.title}</li>
								<li>{game.notes}</li>
								<li>{game.rating}</li>
								<li>{game.status}</li>
								<li>{game.platform}</li>
								<li><img src={game.coverUrl} width={300} alt={`Cover image for ${game.title}`}/></li>
							</ul>
						</li>
					))}
				</>
			)}
			</ul>
		</>
	)
}

export default GameCollection