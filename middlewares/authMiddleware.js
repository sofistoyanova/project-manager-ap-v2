module.exports = (req, res, next) => {
    if(!req.session.user) {
        return res.send('Please log in first')
    }
    next()
}