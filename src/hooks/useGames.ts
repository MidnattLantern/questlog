import { useEffect, useState } from "react";

function useGames() {
    const [gameStatusFilter, setGameStatusFilter] = useState<string>(() => {
        const storage = localStorage.getItem('gameStatusFilter')
        if (!storage) return '' // App might break if nothing in storage isn't addressed and set as empty string
        else return JSON.parse(storage)
    })

    useEffect(() => {
        localStorage.setItem('gameStatusFilter', JSON.stringify(gameStatusFilter))
    }, [gameStatusFilter])

    return [gameStatusFilter, setGameStatusFilter] as const
}

export default useGames