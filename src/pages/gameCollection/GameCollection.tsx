import { gameStatusOptions } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"

function GameCollection() {
	const {
		gameCollection, errorMessage, isLoading,
		gameStatusFilter, setGameStatusFilter
	} = useGames({fetchData: true})

	function handleChangeGameStatus(e: React.ChangeEvent) {
		setGameStatusFilter((e.target as HTMLSelectElement).value)
	}

	return (
		<>
			<p>gameStatusFilter: {gameStatusFilter}</p>
			<select defaultValue={gameStatusFilter ? gameStatusFilter : ''} onChange={handleChangeGameStatus}>
				<option value={''}>All</option>
				{gameStatusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			{isLoading && <p>loading…</p>}
			{errorMessage && <p>{errorMessage}</p>}
			{gameCollection ? gameCollection.map(game => (<GameCard key={game.id} game={game} preview={true}/>)) : undefined}
		</>
	)
}

export default GameCollection