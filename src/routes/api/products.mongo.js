import { Router } from "express"
import Products from '../../models/prodcuct.model.js'

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        let title = req.body.title
        let description = req.body.description
        let price = Number(req.body.price)
        let thumbnail = req.body.thumbnail
        let stock = Number(req.body.stock)

        // Ejecutar la función de añadir producto correctamente y manejar errores
        let response = await Products.create({ title, description, price, thumbnail, stock });
        if (response) {
            //return res.redirect('/products') 
            return res.status(201).json(response);
        }

        return res.status(400).json({ message: 'Product not created' }); // Manejar error genérico
    } catch (error) {
        console.log("hubo un error tio")
        next(error); // Manejar errores correctamente
    }
});

router.get('/', async (req, res, next) => {
    try {
        let products = await Products.find().exec()
        return res.status(200).json(products)
    } catch (error) {
        next(error)
    }
})



router.get('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let product = await Products.findById(id).exec()
        console.log(product)
        return res.status(200).json(product)
    } catch (error) {
        next(error)
    }
})
router.put('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let data = req.body
        let response = await Products.findByIdAndUpdate(id, data)
        if (response) {
            return res.status(200).json({ message: 'product updated' })
        }
        return res.status(400).json({ message: 'product not found' })
    } catch (error) {
        next(error)
    }
})
router.delete('/:pid', async (req, res, next) => {
    try {
        let id = String(req.params.pid)
        let response = await Products.findByIdAndDelete(id)
        if (response) {
            return res.status(200).json({ message: 'product deleted' })
        }
        return res.status(404).json({ message: 'not found' })
    } catch (error) {
        next(error)
    }
})

export default router