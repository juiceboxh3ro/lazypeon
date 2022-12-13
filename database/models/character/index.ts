import mongoose from 'mongoose'

const professionTier = {
  id: { type: Number, required: true },
  name: { type: String, required: true },
  skill_points: Number,
  max_skill_points: Number,
  known_recipes: [],
}

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
        profession: {
          id: { type: Number, required: true },
          name: { type: String, required: true },
        },
        tiers: [
          {
            max_skill_points: Number,
            skill_points: Number,
            tier: professionTier
          }
        ]
      }
    ],
    secondaries: [
      {
        profession: {
          id: { type: Number, required: true },
          name: { type: String, required: true },
        },
        // skill_points: Number, // archaeology only
        // max_skill_points: Number, // archaeology only
        // tiers: [professionTier]
      }
    ],
  }
}, {
  timestamps: true
})

const character = mongoose.model('character', characterSchema)

export default character
