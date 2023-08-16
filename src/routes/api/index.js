import { Router } from "express"
import carts_router from './carts.mongo.js'
import products_router from './products.mongo.js'
import auth_router from './auth.js'
import { generateUser, generateProduct } from "../../utils/mocks/generateUserFake.js"

const router = Router()


router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth', auth_router)

// Endpoint solo para pruebas, /api/mockusers
router.get('/mockusers', (req,res)=>{
    const { limit } = req.query

    const users = []
    for(let i = 0; i < (limit||100); i++){
        users.push(generateUser())
    }

    return res.status(200).json({
        status:'success',
        payload: users
    })
})

// Endpoint solo para pruebas, /api/mockusers
router.get('/mockingproducts', (req,res) => {
    const { limit } = req.query

    const products = []
    for(let i = 0; i < (limit||100); i++){
        products.push(generateProduct())
    }

    return res.status(200).json({
        status:'success',
        payload: products
    })
})

router.get("/loggerTest", (req, res) => {
    req.logger.fatal("Fatal logger test 1")
    req.logger.error("Error logger test 2")
    req.logger.warning("Warning logger test 3")
    req.logger.info("Info logger test 4")
    req.logger.debug("Debug logger test 5")
    return res.status(201).json({
        success: true,
        message: "logs created!"
    })
})

export default router