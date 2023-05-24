import { Router } from "express"
import prod_manager from '../../managers/product.js'
import Product from '../../models/prodcuct.model.js'

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        let title = req.body.title
        let description = req.body.description
        let price = Number(req.body.price)
        let thumbnail = req.body.thumbnail
        let stock = Number(req.body.stock)

        // Ejecutar la función de añadir producto correctamente y manejar errores
        let response = await Product.create( { title, description, price, thumbnail, stock } );
        if (response) {
            return res.redirect('/products') 
            // ,res.json({ status:201,message:'product created'}); 
        }
    
        return res.status(400).json({ status: 400, message: 'Product not created' }); // Manejar error genérico
        } catch (error) {
        next(error); // Manejar errores correctamente
        }
    });

router.get('/', async(req,res,next)=> {
    try {
        let products = await Product.find()
        if (products.length>0) {
            return res.json({ status:200,products })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})

    
router.get('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let product = await Product.findById(id)
        if (product) {
            return res.json({ status:200,product })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.put('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let data = req.body
        let response = await Product.findByIdAndUpdate(id,data)
        if (response) {
            return res.json({ status:200,message:'product updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})
router.delete('/:pid', async(req,res,next)=> {
    try {
        let id = Number(req.params.pid)
        let response = await Product.findByIdAndDelete(id)
        if (response) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

export default router