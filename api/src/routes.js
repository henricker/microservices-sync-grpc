import { Router } from 'express'
import { userController } from './controllers/UserController'
import { sessionController } from './controllers/SessionController'
import { authMiddleware } from './middlewares/auth'
import { purchaseController } from './controllers/PurchaseController'
 
const router = Router()

router.get('/users/:id', userController.show)
router.post('/users', userController.store)
router.post('/session', sessionController.store)

router.get('/purchases', authMiddleware, purchaseController.index)
router.post('/purchases', authMiddleware, purchaseController.store)
router.get('/purchases/:id', authMiddleware, purchaseController.show)

export default router