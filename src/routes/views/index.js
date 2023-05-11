import { Router } from "express"
import auth_router from "./auth.js"
import products_router from "./products.js"
import cart_router from "./carts.js"

const router = Router()

router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'index',    //nombre de la vista
                {           //datos dinamicos que puede llegar a necesitar la vista
                    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',
                    //last_name: 'borraz',
                    produtcs: [
                        {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/1.jpg', price: '$15.000'},
                        {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/2.jpg', price: '$20.000'},
                        {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/3.jpg', price: '$23.000'}],
                    title: 'index',
                    script: '/public/conection.js'
                }        
            )
        } catch (error) {
            next(error)
        }
    }
)

router.get(
    '/prodcuts',
    async(req,res,next) => {
        try {
            return res.render(
                'prodcuts',
                { title: 'products' }
            )
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/chat',
    async(req,res,next) => {
        try {
            return res.render(
                'chat',
                { title: 'chat bot' }
            )
        } catch (error) {
            next()
        }
    }
)

router.use('/auth',auth_router)
router.use('/products',products_router)
router.use('/carts',cart_router)

export default router
//en el enrutador principal de vistas
//UNICAMENTE llamo a los enrutadores de vistas de recursos
//el endpoint de prueba de la linea y ESTA MAL UBICADO