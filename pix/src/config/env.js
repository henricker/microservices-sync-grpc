import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(__dirname, '..', '..', '.env')
})

export default {
  database: {
    mongoUrl: process.env.MONGO_URL
  }
}