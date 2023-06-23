function pass_is_8 (req,res,next) {
    const { password } = req.body
    if (password.length >= 8) {
        return next()
    }
    return res.status(400).json({
        success: false,
        message: 'password must have at least 8 characters'
    })
}

export default pass_is_8