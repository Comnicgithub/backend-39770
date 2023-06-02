import { Router } from "express"
// import manager from '../../managers/cart.js'
import Carts from '../../models/cart.model.js'
import Products from "../../models/prodcuct.model.js"

const router = Router()

router.post('/', async(req,res,next)=> {
    try {
        let response = await Carts.create(req.body)
        if (response) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const all = await Carts.find()
        const message = all.length > 0 ? 'found' : 'not found'
        const status = all.length > 0 ? 200 : 404
        res.json({ status, message, all })
        } catch (error) {
        next(error)
        }
    })

router.get('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let one = await Carts.findOne({_id: id})
        if (one !== null && one !== undefined) {
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
        let id = req.params.cid
        let data = req.body


        const cart = await Carts.findByIdAndUpdate(id,data)

        let response = await Carts.findByIdAndUpdate(id,data)
        if (response) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

// router.put("/:cid/product/:pid/:units", async (req, res, next) => {
//     try {
//         let id = Number(req.params.pid);
//         let cid = Number(req.params.cid);
//         let units = Number(req.params.units);
    
//         // let response = await Carts.findByIdAndUpdate(cid, id, units);
//         let response = await manager.reserve_stock(cid, id, units);
//         if (response === 200) {
//             return res.json({ status: 200, message: "cart updated" });
//         }
//         return res.json({ status: 404, message: "not found" });
//     } catch (error) {
//         next(error);
//     }
// });

router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        let id = req.params.pid;
        let cid = req.params.cid;
        let units = Number(req.params.units);

        let cart = await Carts.findById(cid);
        let product = await Products.findById(id);

        if (cart && product) {
            if (product.stock >= units) {
                cart.products.push({ product: product._id, units: units });
                cart.total += product.price * units;
                product.stock -= units;
                await cart.save();
                await product.save();
                return res.status(200).json({ message: "Cart updated" });
            } else {
                return res
                    .status(400)
                    .json({ message: "Not enough stock available" });
            }
        } else {
            return res.status(404).json({ message: "Not found" });
        }
    } catch (error) {
        next(error);
    }
});


router.delete('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let response = await Carts.findByIdAndDelete(id)
        if (response) {
            return res.json({ status:200,message:'cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

// router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
//         try {
//         let id = Number(req.params.pid);
//         let cid = Number(req.params.cid);
//         let units = Number(req.params.units);
    
//         let response = await manager.delete_cart(cid, id, units);
//         if (response === 200) {
//             return res.json({ status: 200, message: "Units Delete" });
//         }
//         return res.json({ status: 404, message: "not found" });
//         } catch (error) {
//         next(error);
//         }
//     });

// router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
//     try {
//         const cid = req.params.cid;
//         const pid = req.params.pid;
//         const units = Number(req.params.units);

//         if (Number.isNaN(units)) { // check if units is actually a number
//             return res.status(400).json({ message: "Invalid units parameter" });
//         }

//         const cart = await Carts.findById(cid);
//         console.log(cart)

//         if (!cart) { // check if cart exists
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const product_buscado = cart.products.find(item => item._id === pid);

//         console.log(product_buscado)

//         if (!product_buscado) { // check if product exists in cart
//             return res.status(404).json({ message: "Product not found in cart" });
//         }

//         cart.products.splice(product_buscado.units, units); // remove product from cart
//         await cart.save(); // save cart

//         res.status(204).end(); // return success without content
//     } catch (error) {
//         next(error);
//     }
// });


router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        const cid = req.params.cid;
        const pid = req.params.pid;
        const units = Number(req.params.units);
    
        if (Number.isNaN(units)) { // check if units is actually a number
            return res.status(400).json({ message: "Invalid units parameter" });
        }
    
        let cart = await Carts.findById(cid);
        let product_buscado = await Carts.findOne({_id: cid }, { products: { $elemMatch: { _id: pid } } } )
        // const product_buscado = await Carts.findOne({ _id: cid, products: {_id: pid}  });
        // const product_buscado = await Carts.findOne({ _id: String(cid), products: { $elemMatch: { _id: String(pid) } } });



        console.log(cart)
        console.log(product_buscado)
    
        if (!cart) { // check if cart exists
            return res.status(404).json({ message: "Cart not found" });
        }
    
        const updateResult = await Carts.findOneAndUpdate(
            { _id: cid, products: { $elemMatch: { _id: pid } } },
            { $inc: { "products.$.units": -units } },
            { new: true }
        );
        console.log(updateResult)
    
        if (!updateResult) { // check if product exists in cart
            return res.status(404).json({ message: "Product not found in cart" });
        }
    
        res.status(204).end(); // return success without content
        } catch (error) {
        next(error);
        }
    });

export default router