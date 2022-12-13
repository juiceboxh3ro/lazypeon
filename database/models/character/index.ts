import mongoose from 'mongoose'

const characterSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  guild: {
    name: String,
    rank: String,
    realm: String,
  },
  professions: {
    primaries: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        tiers: []
      }
    ],
    secondaries: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        tiers: []
      }
    ],
  }
}, {
  timestamps: true
})

const character = mongoose.model('character', characterSchema)

export default character
