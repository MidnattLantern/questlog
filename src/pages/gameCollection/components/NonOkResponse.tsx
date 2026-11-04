import type { IApiFetchStatus } from "../../../models/api-fetch-status";

function NonOkResponse({apiFetchStatus}: {apiFetchStatus: IApiFetchStatus}) {
    return (
        apiFetchStatus.fetchErrorMessage ? (
            <p>{apiFetchStatus.fetchErrorMessage}</p>
        ) : (
            <p>Your game collection is loading…</p>
        )
    )
}

export default NonOkResponse