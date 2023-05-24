import { Router } from "express"
// import manager from '../../managers/cart.js'
import Carts from '../../models/cart.model.js'

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


// router.get('/', async(req,res,next)=> {
//     try {
//         let all = Carts.find()
//         if (all.length>0) {
//             return res.json({ status:200,all })
//         }
//         let message = 'not found'
//         return res.json({ status:404,message })
//     } catch(error) {
//         next(error)
//     }
// })
router.get('/:cid', async(req,res,next)=> {
    try {
        let id = Number(req.params.cid)
        let one = Carts.findById(id)
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

router.put("/:cid/product/:pid/:units", async (req, res, next) => {
    try {
        let id = Number(req.params.pid);
        let cid = Number(req.params.cid);
        let units = Number(req.params.units);
    
        let response = await Carts.findByIdAndUpdate(cid, id, units);
        if (response === 200) {
            return res.json({ status: 200, message: "cart updated" });
        }
        return res.json({ status: 404, message: "not found" });
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

router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
        try {
        let id = Number(req.params.pid);
        let cid = Number(req.params.cid);
        let units = Number(req.params.units);
    
        let response = await manager.delete_cart(cid, id, units);
        if (response === 200) {
            return res.json({ status: 200, message: "Units Delete" });
        }
        return res.json({ status: 404, message: "not found" });
        } catch (error) {
        next(error);
        }
    });


export default router