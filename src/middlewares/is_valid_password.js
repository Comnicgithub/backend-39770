import { compareSync } from "bcrypt"
import Users from "../models/user.model.js"

export default async function(req,res,next) {
    let user = await Users.findOne({ email:req.body.mail })
    console.log(user)
    console.log(req.body)
    if (user) {
        let verified = compareSync(
            req.body.password,      //lo que envía el cliente en el form
            user.password           //lo que está guardado en mongo
        )
        if (verified) {
            return next()
        }
    }
    return res.status(401).json({
        success:false,
        message:'auth error'
    })
}

