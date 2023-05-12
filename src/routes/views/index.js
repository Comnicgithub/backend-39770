import { Router } from "express"
import auth_router from "./auth.js"


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
    '/products',
    async(req,res,next) => {
        try {
            return res.render(
                'products',
                {   produtcs: [
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/1.jpg', price: '$15.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/2.jpg', price: '$20.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/3.jpg', price: '$23.000'}],
                title: 'index',
                script: '/public/conection.js',
                    title: 'Products' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/new_product',
    async(req,res,next) => {
        try {
            return res.render(
                'new_product',
                {   produtcs: [
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/1.jpg', price: '$15.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/2.jpg', price: '$20.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/3.jpg', price: '$23.000'}],
                title: 'index',
                script: '/public/conection.js',
                    title: 'Product' }
            )
        } catch (error) {
            next()
        }
    }
)


router.get(
    '/carts',
    async(req,res,next) => {
        try {
            return res.render(
                'carts',
                {    name: 'Nico',
                    last_name: 'Lopez',
                    photo: 'https://www.w3schools.com/howto/img_avatar.png',
                    //last_name: 'borraz',
                    
                    produtcs: [
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/1.jpg', price: '$15.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo:'public/img/2.jpg', price: '$20.000'},
                    {name:'Anteojos Ray-Ban Wayfarer 4195Mi', photo: 'public/img/3.jpg', price: '$23.000'}],
                title: 'index',
                script: '/public/conection.js',
                    title: 'Cart' }
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
                { title: 'Chat bot' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/form',
    async(req,res,next) => {
        try {
            return res.render(
                'form',
                { title: 'Form' }
            )
        } catch (error) {
            next()
        }
    }
)

router.get(
    '/register',
    async(req,res,next) => {
        try {
            return res.render(
                'register',
                { title: 'Register' }
            )
        } catch (error) {
            next()
        }
    }
)

router.use('/auth',auth_router)
// router.use('/products',products_router)
// router.use('/carts',carts_router)

export default router
//en el enrutador principal de vistas
//UNICAMENTE llamo a los enrutadores de vistas de recursos
//el endpoint de prueba de la linea y ESTA MAL UBICADO