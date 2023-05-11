import { Router } from "express"

const products_router = Router()

products_router.get(
    '/',
    async (req,res,next) => {
        try {
            //let hola = chau
            return res.render(
                'Product',    //nombre de la vista
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

export default products_router