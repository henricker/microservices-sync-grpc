import express, { Router } from 'express'
import { userController } from './controllers/UserController'
import { sessionController } from './controllers/SessionController'
import { authMiddleware } from './middlewares/auth'
import { purchaseController } from './controllers/PurchaseController'
import { fileUploaderController } from './controllers/FileUploaderController'
import { multerMiddleware } from './middlewares/multer/multer'
import path from 'path'

const router = Router()

router.get('/users/:id', userController.show)
router.post('/users', userController.store)
router.post('/session', sessionController.store)
router.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
router.post('/upload', multerMiddleware.single('img'), fileUploaderController.upload)



router.get('/purchases', authMiddleware, purchaseController.index)
router.post('/purchases', authMiddleware, purchaseController.store)
router.get('/purchases/:id', authMiddleware, purchaseController.show)

export default router