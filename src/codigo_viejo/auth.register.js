import { Router } from "express"
import { Types } from "mongoose"
import Users from "../models/user.model.js"
import create_hash from "../middlewares/create_hash.js"
import passport from "passport"

const router = Router()

const verify = a => {
    if (a != undefined || a != null) return true
    return false
}

router.use((req, res, next) => { // middleware para validar propiedades obligatorias
    try{
        const { name, photo, mail, role, password } = req.body

        if (verify(name) && verify(mail) && verify(role) && verify(password)) {
            next()
        } else {
            return res.status(400).json({
                success: false,
                message: "missing required data"
            })
        }
    } catch(err) {
        next(err)
    }
    
})

router.use((req, res, next) => { // middleware para validar la contraseña
    const { password } = req.body

    if (String(password).length >= 8) {
        next()
    } else {
        return res.status(400).json({
            success: false,
            message: "password length is lower than 8 characters"
        })
    }
})

router.post('/', 
        create_hash,
        passport.authenticate(
            'register',  // nombre de la estrategia a buscar
            { failureRedirect: '' }  // objeto de configuracion de la ruta de redireccionamiento en caso de error
            
            ),
            (req,res)=> res.status(201).json({
                success: true,
                message: 'user created!'
            })
        )

        router.get('/fail-register',(req,res)=> res.status(400).json({
            success: false,
            message: 'fail register!'
        }))
        


export default router