import { Router } from "express"
import manager from '../../managers/cart.js'
import prod_manager from '../../managers/product.js'

const router = Router()

router.post('/', async(req,res,next)=> {
    try {
        let response = await manager.add_cart(req.body)
        if (response===201) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})
router.get('/', async(req,res,next)=> {
    try {
        let all = manager.read_carts()
        if (all.length>0) {
            return res.json({ status:200,all })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.get('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let one = manager.read_cart(id)
        if (one) {
            return res.json({ status:200,one })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.put('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let data = req.body
        let response = await manager.update_cart(id,data)
        if (response===200) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

//2do intento
router.put('/:cid/product/:pid/:units', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let pid = Number(req.params.pid)
        let cantidad = Number(req.params.unit)
        let agregar_producto = {products: [
            "product: " + prod_manager.getProductById(pid).title,
            "cantidad: " + cantidad 
        ]}
        let response = await manager.update_cart(id,agregar_producto)
        if (response===200) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

// router.put(':cid/product/:pid/:units ', async(req,res,next)=> {
//     try {
//         let id = Number(req.params.cid)
//         let pid= Number(rep.param.pid)
//         let cantidad = Number(rec.param.unit)
//         let agregar_producto = prod_manager.getProductById(pid).title
//         let data = { products: [agregar_producto, cantidad]}
//         let response = await manager.update_cart(id,data)
//         if (response===200) {
//             return res.json({ status:200,message:'cart updated'})
//         }
//         return res.json({ status:404,message:'not found'})
//     } catch(error) {
//         next(error)
//     }
// })

// router.put('/cart/:cid/product/:pid', async (req, res) => {
//     try {
//         const { cid, pid } = req.params;
//         const { quantity } = req.body;

//         const cart = await manager.read_cart(cid);
//         if (!cart) {
//             return res.status(404).send({ message: 'Cart not found' });
//         }

//         const product = await prod_manager.getProductById(pid)
//         if (!product) {
//             return res.status(404).send({ message: 'Product not found' });
//         }

//         const productInCart = cart.products.find(item => item.product.toString() === pid);
//         if (productInCart) {
//             productInCart.quantity = quantity;
//         } else {
//             cart.products.push({ product: pid, quantity });
//         }

//         await cart.save();
//         res.status(200).send({ message: 'Product added to cart', cart });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Internal server error' });
//     }
// });

router.delete('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let response = await manager.destroy_cart(id)
        if (response===200) {
            return res.json({ status:200,message:'cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

export default router