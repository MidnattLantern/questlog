import ReactLogo from './assets/react.svg?react'
import ViteLogo from './assets/vite.svg?react'
import './App.scss'
import { baseUrl } from './config'
import React, { useEffect, useState } from 'react'
import type { IGame } from './models/game'

function App() {
	const [games, setGames] = useState<IGame[]>([])
	const [loading, setLoading] = useState(true)
	const [status, setStatus] = useState<string | null>(null)

	async function handleFetchGames(status?: string | null) {
		console.log('fetching games')
		try {
			let statusQuery: string = ''
			if (status) statusQuery = `?status=${status}`
			const response = await fetch(`${baseUrl}${statusQuery}`)
			if (!response) throw new Error("Couldn't fetch games")
			const data = await response.json()
			// setGames(data)
			console.log('data', data)
			return data
		} catch {
			throw new Error('Failed to fetch games')
		} finally {
			console.log('games fetched')
		}
	}

	useEffect(() => {
		if (loading) handleFetchGames()
			.then(setGames)
			.finally(() => {setLoading(false)})
	}, [loading])

	return (
		<>
			<h1>Questlog</h1>
			<ReactLogo/>
			<ViteLogo/>
			<p>{status}</p>
			<select onChange={(e: React.ChangeEvent) => {
				setStatus((e.target as HTMLSelectElement).value)
				handleFetchGames((e.target as HTMLSelectElement).value).then(setGames)
			}}>
				<option value={''}>All</option>
				<option value={'playing'}>Playing</option>
				<option value={'completed'}>Completed</option>
				<option value={'want'}>Want</option>
				<option value={'dropped'}>Dropped</option>
			</select>
			<ul>
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
			</ul>
		</>
	)
}

export default App
