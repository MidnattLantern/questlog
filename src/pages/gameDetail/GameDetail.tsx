import { useParams } from "react-router"

function GameDetail() {
    const { id } = useParams()

    return (
        <>
            <h2>Game detail</h2>
            <p>ID in question: {id}</p>
        </>
    )
}

export default GameDetail