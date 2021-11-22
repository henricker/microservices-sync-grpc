import HidraService from '../services/hidra'

class SessionController {
  async store(request, response) {
    const { email, password } = request.body

    const data = await HidraService.loginUser({
      user: { email, password }
    })

    return response.json(data)
  }
}

export const sessionController = new SessionController()