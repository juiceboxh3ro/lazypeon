import mongoose from 'mongoose'

const guildSchema = new mongoose.Schema({

}, {
  timestamps: true
})

const guild = mongoose.model('guild', guildSchema)

export default guild
