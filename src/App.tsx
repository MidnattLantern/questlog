import ReactLogo from './assets/react.svg?react'
import ViteLogo from './assets/vite.svg?react'
import './App.scss'
import { baseUrl } from './config'
import React, { useEffect, useState } from 'react'
import type { IGame } from './models/game'

function App() {
	const [games, setGames] = useState<IGame[]>([])
	const [loading, setLoading] = useState(true)
	const [requestStatus, setRequestStatus] = useState<string | null>(null)
	const [status, setStatus] = useState<string | null>(null)
	const [statusOptions, setStatusOptions] = useState<string[]>([])

	async function handleFetchGames(status?: string | null) {
		try {
			let statusQuery: string = ''
			if (status) statusQuery = `?status=${status}`
			const response = await fetch(`${baseUrl}${statusQuery}`)
			if (!response) throw new Error("Couldn't fetch games")
			const data = await response.json()
			return data
		} catch (error) {
			console.error('Failed to fetch games', error)
			return 'error'
		}
	}

	useEffect(() => {
		function handleFetchStatusOptions(games: IGame[]) {
			const statusOptions: string[] = []
			games.forEach(game => {
				if (!statusOptions.includes(game.status)) statusOptions.push(game.status)
			})
			setStatusOptions(statusOptions)
		}

		if (loading) handleFetchGames()
			.then((fetched) => {
				// Undefined means the call went ok, returned message means something went wrong
				if (fetched.message === undefined) setGames(fetched)
				if (fetched.message === undefined) handleFetchStatusOptions(fetched)
				if (fetched.message) setRequestStatus('Something went wrong')
			})
			.finally(() => {
				setLoading(false)
			})
	}, [loading, statusOptions])

	return (
		<>
			<h1>Questlog</h1>
			<ReactLogo/>
			<ViteLogo/>
			{requestStatus && <p>{requestStatus}</p>}
			<p>status: {status}</p>
			<select onChange={(e: React.ChangeEvent) => {
				setStatus((e.target as HTMLSelectElement).value)
				handleFetchGames((e.target as HTMLSelectElement).value).then(setGames)
			}}>
				<option value={''}>All</option>
				{statusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			<ul>
			{loading && <p>Loading</p>}
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
