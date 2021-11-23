import HidraService from '../services/hidra'

export const authMiddleware = async (request, response, next) => {
  const token = request.headers.authorization

  const data = await HidraService.authenticate({ token })

  if(data.error)
    return response.status(403).json({ error: data.error })

  request.userId = data.user.id
  next()
}