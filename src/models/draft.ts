export type IDraft = {
    title: string,
    platform: string,
    status: 'playing' | 'completed' | 'want' | 'dropped' | null,
    rating: number | null,
    coverUrl: string,
    notes: string
}