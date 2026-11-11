const apiHandle = 'alma-i'
// const apiHandle = 'alma-i-empty' // To test behavior if the collection is empty
const poisonUrl = '' // To test 404, leave empty string for normal behavior
export const baseUrl = `https://questlog-api.vercel.app/api/${apiHandle}/${poisonUrl}games`

export const gameStatusOptions = ['completed', 'playing', 'dropped', 'want']