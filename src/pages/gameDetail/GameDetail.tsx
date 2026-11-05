import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"
import { baseUrl } from "../../config"
import { useEffect } from "react"

function GameDetail() {
    const { id } = useParams()

    // ====================
    // Functions & handlers
    // ====================
    async function handleFetchGame() {
        try {
            const response = await fetch(`${baseUrl}/${id}`)
            const data = await response.json()
            const status = response.status
            return {data, status}
        } catch (error) {
            console.error(error)
            return
        }
    }
    // ====================

    useEffect(() => {
        handleFetchGame()
        .then((fetched) => {
            console.log(fetched?.status)
        })
    }, [])

    return (
        <>
            <h2>Game detail</h2>
            <BackToCollectionButton/>
            <p>ID in question: {id}</p>
        </>
    )
}

export default GameDetail