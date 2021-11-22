import HidraService from '../services/hidra'

class UserController {
  async show(request, response) {
    const { id } = request.params
    const data = await HidraService.getUserById({ id })
    return response.json(data)
  }

  async store(request, response) {
    const { email, username, password } = request.body

    const data = await HidraService.registerUser({
      user: { email, username, password }
    })
    
    return response.json(data)
  }
}

export const userController = new UserController()