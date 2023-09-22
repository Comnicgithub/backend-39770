import { Router } from "express"
import Users from "../../dao/mongo/models/user.model.js"

const router = Router()


router.get("/premium/:uid", async (req, res, next) => {
    try {
        
        const { uid } = req.params

        const mongouser = await Users.findById(uid)

        console.log(mongouser)
        if (req.user.role != "admin") return res.status(401).json({
            success: false,
            message: "unauthorized"
        })

        if (mongouser == null) return res.status(404).json({
            success: false,
            message: "user not found"
        })

        if (mongouser.role == "admin") return res.json(401).json({
            success: false,
            message: "cant change admin privileges"
        })

        mongouser.role = mongouser.role == "user" ? "premium" : "user"
        
        await mongouser.save()

        res.status(200).json({
            success: true,
            message: `user role changed to ${mongouser.role}`
        })

    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.post("/:uid/documents", async (req, res, next) => {

})

export default router