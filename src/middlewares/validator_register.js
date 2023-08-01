function validator_register(req, res, next) {
    const { first_name, last_name, password, email, mail } = req.body
    console.log(first_name, last_name, password, email, mail)
    if (!first_name || !last_name || !password || !mail) {
        return res.status(400).json({
            success: false,
            message: 'name,password,email are required'
        })
    } else {
        return next()
    }
}

export default validator_register