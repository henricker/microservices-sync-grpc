import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import env from '../config/env'

const userSchema = new mongoose.Schema({
  id: Number,
  email: String,
  username: String,
  password: String
})

userSchema.pre('save', async function (next) {
  if( !this.isModified('password') ) next()
  this.password = await bcrypt.hash(this.password, 8)
})

userSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password); 
  }
}

userSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, env.jwt.secret)
  }
}

export default mongoose.model('User', userSchema)