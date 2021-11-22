import mongoose from 'mongoose'
import env from '../config/env'

mongoose.connect(env.database.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})