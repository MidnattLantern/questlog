export type IStatus = 'playing' | 'completed' | 'want' | 'dropped' | null

export type IGame = {
    id: string,
    title: string,
    platform: string,
    status: IStatus,
    rating: number,
    coverUrl: string,
    notes: string
}