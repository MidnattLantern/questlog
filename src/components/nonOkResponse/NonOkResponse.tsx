import type { IApiFetchStatus } from "../../models/api-fetch-status";

function NonOkResponse({apiFetchStatus, loadingMessage = 'Hold on a minute…'}: {apiFetchStatus: IApiFetchStatus, loadingMessage?: string}) {
    return (
        apiFetchStatus.fetchErrorMessage ? (
            <p>{apiFetchStatus.fetchErrorMessage}</p>
        ) : (
            <p>{loadingMessage}</p>
        )
    )
}

export default NonOkResponse