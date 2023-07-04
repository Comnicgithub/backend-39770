import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    console.log("generando token:")
    console.log(req.user)
    req.token = jwt.sign(
        { email: req.user.mail, password: req.user.password },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
    )
    return next()
}