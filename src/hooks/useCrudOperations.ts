import { useState } from "react"
import { baseUrl } from "../config"
import type { IDraft } from "../models/draft"
import { useNavigate } from "react-router"

function useCrudOperations() {
    const navigate = useNavigate()
    const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null)
    const [disabledSubmitButton, setDisabledSubmitButton] = useState<boolean>(false)

    async function handleCreateGame(draft: IDraft) {
        setDisabledSubmitButton(true)
        console.log('handle create game')
        try {
            const response = await fetch(`${baseUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(draft)
            })
            const data = await response.json()
            const status = response.status
            
            console.log(data)
            console.log(status)

            if (status === 201) {
                setSubmitErrorMessage(null)
                navigate(`/detail/${data.id}`)
            } else if (status === 404) {
                setSubmitErrorMessage('Failed to create game because of a database server side error–invalid fetch URL')
            } else {
                setSubmitErrorMessage(data.message)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setDisabledSubmitButton(false)
        }
    }

    return {
        handleCreateGame,
        submitErrorMessage,
        disabledSubmitButton
    }
}

export default useCrudOperations