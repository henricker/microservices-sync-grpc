import NixService from '../services/nix'

class PurchaseController {
  async index(request, response) {
    const data = await NixService.listPurchases({
      userId: request.userId
    })
    return response.json(data)
  }

  async show(request, response) {
    const { id } = request.params
    const data = await NixService.getPurchaseById({ id })
    return response.json(data)
  }

  async store(request, response) {
    const { title, value } = request.body
    
    const data = await NixService.purchase({
      purchase: { title, value, userId: request.userId }
    })

    return response.json(data)
  }
}

export const purchaseController = new PurchaseController()
