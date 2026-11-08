const apiHandle = 'alma-i'
const poisonUrl = '' // To test 404, leave empty string for normal behaviour
export const baseUrl = `https://questlog-api.vercel.app/api/${apiHandle}/${poisonUrl}games`

export const gameStatusOptions = ['completed', 'playing', 'dropped', 'want']