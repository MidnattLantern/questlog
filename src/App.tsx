import ReactLogo from './assets/react.svg?react'
import ViteLogo from './assets/vite.svg?react'
import './App.scss'
import { baseUrl } from './config'
import { useEffect, useState } from 'react'
import type { IGame } from './models/game'

function App() {
	const [games, setGames] = useState<IGame[]>([])
	const [loading, setLoading] = useState(true)

	async function handleFetchGames() {
		try {
			console.log('fetching games')
			const response = await fetch(baseUrl)
			if (!response) throw new Error("Couldn't fetch games")
			return response.json()
		} catch {
			return 'error'
		}
	}

	useEffect(() => {
		if (loading)
		handleFetchGames()
		.then(setGames)
		.finally(() => {
			setLoading(false)
		})
	}, [loading])

	return (
		<>
			<h1>Questlog</h1>
			<ReactLogo/>
			<ViteLogo/>
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
