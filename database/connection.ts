import mongoose from 'mongoose'

const connect = async () => {
  const uri = process.env.DB_CONNECTION || ''
  mongoose.connect(uri)
}

export default connect
