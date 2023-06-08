import { Router } from "express"
// import manager from '../../managers/cart.js'
import Carts from '../../models/cart.model.js'
import Products from "../../models/prodcuct.model.js"

const router = Router()

router.post('/', async (req, res, next) => {
    try {
        const response = await Carts.create({products: []})
        if (response) {
            return res.status(201).json({ id: response._id.toJSON(), cart: response, message: 'cart created' })
        }
        return res.status(400).json({ message: 'not created' })
    } catch (error) {
        next(error)
    }
})

router.get('/', async (req, res, next) => {
    try {
        const all = await Carts.find().exec()
        res.status(200).json(all)
    } catch (error) {
        next(error)
    }
})

router.get('/:cid', async (req, res, next) => {
    try {
        let id = req.params.cid
        let one = await Carts.findById(id).exec()
        return res.status(200).json(one)
    } catch (error) {
        next(error)
    }
})

router.put('/:cid', async (req, res, next) => {
    try {
        let id = req.params.cid
        let data = req.body

        let response = await Carts.findByIdAndUpdate(id, data)
        if (response) {
            return res.status(200).json({ message: 'cart updated' })
        }
        return res.status(404).json({ message: 'not found' })
    } catch (error) {
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

        let cart = await Carts.findById(cid)
        let product = await Products.findById(id)

        console.log(cart)
        console.log(product)

        if (cart && product) {
            if (product.stock >= units) {
                product.stock -= units
                const index = cart.products.findIndex(e=>e.product == id)
                if ( index == -1) {
                    cart.products.push({product: id, units: units})
                } else {
                    cart.products[index].units += units
                    cart.markModified('products');
                }

                //Carts.findByIdAndUpdate(cid, {products: cart.products})
                //Products.findByIdAndUpdate(id, product)

                await cart.save()
                await product.save()

                //Products.findByIdAndUpdate(id, product)
                //cart.products.push({ product: product._id, units: units });
                //cart.total += product.price * units;
                //product.stock -= units;
                //wait cart.save();
                //await product.save();
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


router.delete('/:cid', async (req, res, next) => {
    try {
        let id = req.params.cid
        let response = await Carts.findByIdAndDelete(id)
        if (response) {
            return res.json({ status: 200, message: 'cart deleted' })
        }
        return res.json({ status: 404, message: 'not found' })
    } catch (error) {
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

        const cart = await Carts.findById(cid)
        const product = await Products.findById(pid)
        if (cart == null || product == null) { return res.status(400).json({message: "product or cart null"})}

        const index = cart.products.findIndex(e => e.product == pid)
        if (index == -1) { return res.status(400).json({message: "product not in cart"})}
        if (units > cart.products[index].units) { return res.status(400).json({message: "invalid units"})}

        cart.products[index].units -= units
        if (cart.products[index].units <= 0) {
            cart.products.splice(index, 1)
        }
        product.stock += units
        cart.markModified('products');

        await cart.save()
        await product.save()

        return res.status(200).json({message: "successfully updated"})
        /*
        //let product_buscado = await Carts.findOne({ _id: cid }, { products: { $elemMatch: { _id: pid } } })
        // const product_buscado = await Carts.findOne({ _id: cid, products: {_id: pid}  });
        // const product_buscado = await Carts.findOne({ _id: String(cid), products: { $elemMatch: { _id: String(pid) } } });



        //console.log(cart)
        //console.log(product_buscado)

        //if (!cart) { // check if cart exists
            //return res.status(404).json({ message: "Cart not found" });
        //}

        const updateResult = await Carts.findOneAndUpdate(
            { _id: cid, products: { $elemMatch: { _id: pid } } },
            { $inc: { "products.$.units": -units } },
            { new: true }
        );
        console.log(updateResult)

        if (!updateResult) { // check if product exists in cart
            return res.status(404).json({ message: "Product not found in cart" });
        }*/
        //res.status(204).end(); // return success without content
    } catch (error) {
        next(error);
    }
});

export default router