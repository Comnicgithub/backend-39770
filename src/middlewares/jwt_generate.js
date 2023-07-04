import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    req.token = jwt.sign(
        { mail: req.user.mail, password: req.user.password },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 }
    )
    return next()
}