import { useState } from "react";

function useGames() {
    const [gameStatusFilter, setGameStatusFilter] = useState<string | null>()

    return [gameStatusFilter, setGameStatusFilter] as const
}

export default useGames