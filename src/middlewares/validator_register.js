export default (req, res, next) => {
    const { first_name, last_name, password, email, mail } = req.body
    if (!first_name || !last_name || !password || !mail) {
        return res.status(400).json({
            success: false,
            message: 'name,password,email are required'
        })
    } else {
        return next()
    }
}