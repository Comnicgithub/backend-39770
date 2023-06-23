import { Router } from "express"
import Users from "../../models/user.model.js"
import session from 'express-session';
import is_valid_password from "../../middlewares/is_valid_password.js";
import passport from "passport"

const router = Router()


router.post('/register', 
        is_valid_password,
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
        

router.post('/login', async (req, res, next) => {
    try {

        if (req.session.mail) return res.status(400).json({ success: false, message: "user is already logged in" })

        const { mail, password } = req.body
        if (!mail && !password) return res.status(401).json({ success: false, message: "invalid mail or password" })

        const finded = await Users.findOne({ mail: String(mail).toLowerCase(), password: String(password) }).exec()
        if (!finded) return res.status(401).json({ success: false, message: "invalid login" })

        //console.log(req.signedCookies)
        // hola nico el max age 604800 * 1000 es debido a que la cookie debe durar 7 dias segun el HOL
        //return res.cookie("sessionCookie", JSON.stringify({ u: finded.mail, pw: finded.password }), { maxAge: 604800 * 1000, signed: true }).status(201).json({ success: true, message: "user is now logged in" })
        req.session.mail = finded.mail
        req.session.role = finded.role

        console.log(req.session.mail)
        return res.status(200).redirect('/perfil')
        // .send({
        //     email: req.session.email
        // })
    } catch (err) {
        next()
    }

})

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