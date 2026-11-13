import Styles from "./ErrorMessage.module.scss"
import DismissIcon from "../../assets/dismiss-icon.svg?react"

// When placing this in the component's DOM, keep it close after the submit button so keyboard users are within close reach
function ErrorMessage({
    errorMessage,
    handleDismissError
} : {
    errorMessage: string,
    handleDismissError: () => void
}) {
    // Until figuring out how to manage all the get and set responsibility here, carry a dismiss handler in each component

    return (
        <div className={Styles.container}>
            <p>{errorMessage}</p>
            <button onClick={handleDismissError} aria-label="Close and hide error message">
                <DismissIcon className={Styles.dismissIcon}/>
            </button>
        </div>
    )
}

export default ErrorMessage