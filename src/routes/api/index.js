import { Router } from "express"
import carts_router from './carts.mongo.js'
import products_router from './products.mongo.js'
import auth_router from './auth.js'

const router = Router()


router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth', auth_router)

export default router