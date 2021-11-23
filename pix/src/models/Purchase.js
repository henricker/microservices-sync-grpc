import mongoose from 'mongoose'

const PurchaseSchema = new mongoose.Schema({
  userId: String,
  title: String,
  value: Number,
})

export default mongoose.model('Purchase', PurchaseSchema)