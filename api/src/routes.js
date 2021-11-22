import { Router } from 'express'
import { userController } from './controllers/UserController'
import { sessionController } from './controllers/SessionController'

const router = Router()

router.get('/users/:id', userController.show)
router.post('/users', userController.store)

router.post('/session', sessionController.store)

export default router