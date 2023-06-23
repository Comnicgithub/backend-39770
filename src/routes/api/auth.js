import { Router } from "express"
import Users from "../../models/user.model.js"
import session from 'express-session';
import isValidPassword from "../../middlewares/is_valid_password.js";
import passport from "passport"
import create_hash from "../../middlewares/create_hash.js";
import validator_register from "../../middlewares/validator_register.js"
import pass_is_8 from "../../middlewares/pass_is_8.js"
import validator_signin from "../../middlewares/validator_signin.js"

const router = Router()


router.post('/register', 
        validator_register,
        pass_is_8,
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
        

router.post('/login',
    validator_signin,
    pass_is_8,
    passport.authenticate('signin',{ failureRedirect:'/api/auth/fail-signin' }),
    isValidPassword,
    (req,res)=> {
        req.session.mail = req.user.mail
        req.session.role = req.user.role

        console.log(req.session.mail)
        return res.status(200).redirect('/perfil')
})
router.get('/fail-signin',(req,res)=> res.status(400).json({
    success: false,
    message: 'fail sign in!'
}))


router.post("/signout", async(req, res, next) => {
    if (!req.session || !req.session.mail) {
        return res.status(401).json({success: false, message: "Not authorized"});
    }
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({success: false, message: "Unexpected error"});
        }
        return res.redirect("/perfil");
    });
});




export default router