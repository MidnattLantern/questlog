export type IStatus = 'playing' | 'completed' | 'want' | 'dropped'

export type IGame = {
    id: string,
    title: string,
    platform: string,
    status: IStatus,
    rating: number,
    coverUrl: string,
    notes: string
}