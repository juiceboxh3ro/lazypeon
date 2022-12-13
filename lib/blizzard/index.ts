import { BlizzAPI } from 'blizzapi'

const api = new BlizzAPI({
  region: 'us',
  clientId: process.env.BLIZZ_CLIENT_ID,
  clientSecret: process.env.BLIZZ_CLIENT_SECRET
})

export default api
