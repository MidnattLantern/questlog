import { useParams } from "react-router"

function EditGame() {
    const { id } = useParams()

    return (
        <>
            <h2>Edit</h2>
            <p>ID in question: {id}</p>
        </>
    )
}

export default EditGame