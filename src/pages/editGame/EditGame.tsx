import { useParams } from "react-router"
import BackToCollectionButton from "../../components/backToCollectionButton/BackToCollectionButton"

function EditGame() {
    const { id } = useParams()

    return (
        <>
            <h2>Edit</h2>
            <BackToCollectionButton/>
            <p>ID in question: {id}</p>
        </>
    )
}

export default EditGame