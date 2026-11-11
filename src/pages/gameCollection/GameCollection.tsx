import { gameStatusOptions } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"

function GameCollection() {
	const {
		errorMessage, isLoading,
		gameStatusFilter, setGameStatusFilter,
		gameCollection
	} = useGames({fetchData: true})

	function handleChangeGameStatus(e: React.ChangeEvent) {
		setGameStatusFilter((e.target as HTMLSelectElement).value)
	}

	return (
		<>
			{errorMessage && <p>{errorMessage}</p>}
			{isLoading && <p>loading…</p>}
			<p>gameStatusFilter: {gameStatusFilter}</p>
			<select defaultValue={gameStatusFilter ? gameStatusFilter : ''} onChange={handleChangeGameStatus}>
				<option value={''}>All</option>
				{gameStatusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			{gameCollection ? gameCollection.map(game => (<GameCard key={game.id} game={game} preview={true}/>)) : undefined}
		</>
	)
}

export default GameCollection