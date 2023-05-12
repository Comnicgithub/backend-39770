import { Router } from "express"
import prod_manager from '../../managers/product.js'

const router = Router()

// router.post('/', async(req,res,next)=> {
//     try {
//         let response = await prod_manager.add_product(req.body)
//         if (response===201) {
//             return res.json({ status:201,message:'product created'})
//         }
//         return res.json({ status:400,message:'not created'})
//     } catch(error) {
//         next(error)
//     }
// })

router.post('/', async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, stock } = req.body;
    
        // Ejecutar la función de añadir producto correctamente y manejar errores
        const newProduct = await prod_manager.add_product({ title, description, price, thumbnail, stock });
        if (newProduct) return res.status(201).json({ status: 201, message: 'Product created', product: newProduct }); // Devolver una respuesta más detallada con el nuevo producto agregado
    
        return res.status(400).json({ status: 400, message: 'Product not created' }); // Manejar error genérico
        } catch (error) {
        next(error); // Manejar errores correctamente
        }
    });

router.get('/', async(req,res,next)=> {
    try {
        let products = prod_manager.read_products()
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
        let product = prod_manager.read_product(id)
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
        let response = await prod_manager.update_product(id,data)
        if (response===200) {
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
        let response = await prod_manager.destroy_product(id)
        if (response===200) {
            return res.json({ status:200,message:'product deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

export default router