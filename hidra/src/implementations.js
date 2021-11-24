import User from './models/User'
import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import env from './config/env'
import fs from 'fs'
import path from 'path'

export default {
  
  async getUserById(call, callback) {
    const { id } = call.request

    const user = await User.findById(id)

    if(!user)
      return callback(null, { error: 'User not found' })

    return callback(null, {
      user: { ...user.toObject(), id: user._id, password: undefined }
    })
  },
  
  async registerUser(call, callback) {
    const { email, username, password } = call.request.user
    const user = await User.create({ email, username, password })
    return callback(null, { user: { ...user.toObject(), id: user._id,  password: undefined } })
  },
  
  async loginUser(call, callback) {
    const { email, password } = call.request.user

    const user = await User.findOne({ email })

    if(!user)
      return callback(null, { error: 'User not found' })

    if(!(await user.compareHash(password)))
      return callback(null, { error: 'invalid credentials' })
  
    const token = User.generateToken({ id: user._id })
    return callback(null, {
      token
    })
  },

  async authenticate(call, callback) {
    const { token: fullToken } = call.request

    if (!fullToken) {
      callback(null, { error: 'No token provided' });
    }

    const parts = fullToken.split(' ');

    if (!parts.length === 2) {
      return callback(null, { error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return callback(null, { error: 'Token malformatted' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, env.jwt.secret);

      const user = await User.findById(decoded.id);

      return callback(null, { user: { ...user.toObject(), id: user._id } });
    } catch (err) {
      return callback(null, { error: 'Token invalid' });
    }
  },

  async avatarUpload(call, callback) {
    try {
      let metadata;
      let chuncks = []
      call.on('data', async (payload) => {
        if(payload?.data == 'metadata' && payload[payload.data])
          metadata = payload.metadata
        
        else if(payload.data && payload.data=='file' && payload[payload.data]) {
          const file = payload[payload.data];
          fs.appendFileSync(path.resolve(__dirname, '..', 'uploads', metadata.filename))
          console.log(`Writing file chunk: uploads/${metadata.filename}`)
        }
      })

      call.on('end', async () => {
        callback(null, { message: 'success' })
      })
    } catch(err) {
      console.log(err)
      return callback(null, { message: 'An error occurred' })
    }
  }
}