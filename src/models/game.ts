export type IGame = {
    id: string,
    title: string,
    platform: string,
    status: 'playing' | 'completed' | 'want' | 'dropped',
    rating: number,
    coverUrl: string,
    notes: string
}