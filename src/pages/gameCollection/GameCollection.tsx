import { gameStatusOptions } from "../../config"
import GameCard from "../../components/gameCard/GameCard"
import useGames from "../../hooks/useGames"
import { NavLink } from "react-router"
import Loading from "../../components/loading/Loading"

function EmptyCollection() {
	return (
		<div>
			<p>Your questlog is empty</p>
			<NavLink to='create'>Create your first game</NavLink>
		</div>
	)
}

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
			<select defaultValue={gameStatusFilter ? gameStatusFilter : ''} onChange={handleChangeGameStatus}>
				<option value={''}>All</option>
				{gameStatusOptions.map(option => (
					<option key={option} value={option}>{option}</option>
				))}
			</select>
			{errorMessage && <p>{errorMessage}</p>}
			{isLoading ? (
				<Loading/>
			) : (
				gameCollection && gameCollection.length > 0 ? (
					gameCollection.map(game => (<GameCard key={game.id} game={game} preview={true}/>))
				) : (
					!errorMessage && <EmptyCollection /> // You don't want "questlog empty" to show alongside error message
				)
			)}
		</>
	)
}

export default GameCollection