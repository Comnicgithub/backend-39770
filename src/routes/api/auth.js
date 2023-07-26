import { Router } from "express"
// import Users from "../../models/user.model.js"
// import session from 'express-session';
import isValidPassword from "../../middlewares/is_valid_password.js";
import passport from "passport"
import create_hash from "../../middlewares/create_hash.js";
import validator_register from "../../middlewares/validator_register.js"
import pass_is_8 from "../../middlewares/pass_is_8.js"
import validator_signin from "../../middlewares/validator_signin.js"
import generatejwt from "../../middlewares/jwt_generate.js";
import passport_call from "../../middlewares/passport_call.js"
import jwt from "jsonwebtoken"

const router = Router()


router.post('/register',
    validator_register,
    pass_is_8,
    create_hash,
    passport.authenticate(
        'register',  // nombre de la estrategia a buscar
        { failureRedirect: '' }  // objeto de configuracion de la ruta de redireccionamiento en caso de error

    ),
    (req, res) => res.status(201).json({
        success: true,
        message: 'user created!'
    })
)

router.get('/fail-register', (req, res) => res.status(400).json({
    success: false,
    message: 'fail register!'
}))


router.post('/login',
    validator_signin,
    pass_is_8,
    passport.authenticate('signin', { failureRedirect: '/api/auth/fail-signin' }),
    isValidPassword,
    generatejwt,
    (req, res) => {
        req.session.mail = req.user.mail
        req.session.role = req.user.role
        return res.status(200).cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).redirect('/perfil')
    })

router.get('/fail-signin', async (req, res) => res.status(400).json({
    success: false,
    message: 'fail sign in!'
}))


router.post("/signout",
    passport_call("jwt"),
    async (req, res, next) => {
        delete req.token
        res.clearCookie("token")
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ success: false, message: "Unexpected error" });
            }
            return res.redirect("/perfil");
        });
    }
);

router.get('/github', passport.authenticate('github', { scope: ['user:mail'] }), (req, res) => { })

router.get('/github/callback', passport.authenticate('github', { failureRedirect: 'api/auth/fail-register' }), generatejwt, (req, res) => {
    //req.session.user = req.user
    console.log(req.user)
    console.log(req.token)
    return res.status(302).cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).redirect("/perfil")
    //return res.redirect("/perfil")

    /*return res.status(201).json({
        success: true,
        message: 'user created!',
        user: req.user
    })*/
})

router.get("/fail-register", async (req, res, next) => {
    return res.status(403).json({
        success: false,
        message: "fail to register with github"
    })
})

router.get("/current", passport_call("jwt"), async (req, res, next) => {
    const data = await jwt.verify(req.cookies.token, process.env.JWT_SECRET, async (error, credentials) => {
        if (error) return { message: "error to get token credentials" }
        return credentials
    })
    return res.status(200).json(data)
})

export default router