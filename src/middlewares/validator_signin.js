function validator_signin (req,res,next) {
    const { password,mail } = req.body
    if (!password || !mail) {
        return res.status(400).json({
            success: false,
            message: 'password,email are required'
        })
    } else {
        return next()
    }
}

export default validator_signin