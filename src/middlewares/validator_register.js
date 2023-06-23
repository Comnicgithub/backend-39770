function validator_register (req,res,next) {
    const { name,password,mail } = req.body
    if (!name || !password || !mail) {
        return res.status(400).json({
            success: false,
            message: 'name,password,email are required'
        })
    } else {
        return next()
    }
}

export default validator_register