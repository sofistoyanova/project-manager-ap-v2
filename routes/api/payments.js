const express = require("express")
const router = express.Router()
const keys = require('../../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const mongoose = require("mongoose")
const authMiddleware = require("../../middlewares/authMiddleware")
const User = mongoose.model("users")

router.post('/payment', authMiddleware, async(req, res) => {
    const { id } = req.body
    const userEmail = req.session.user.email

    try {
        let user = await User.findOne({email: userEmail})
        if(user.premium) {
            return res.send({status: 400, message: 'Already premium user cannot charge again'})
        }
        const charge = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            description: 'Create more than one project with the premium pack',
            source: id
        })
        await User.updateOne({email: userEmail}, {premium: true})
        //user = await User.findOne({email: userEmail})
        user = await User.findOne({email: userEmail})
        //req.session.user = user

        return res.send({status: 200, message: 'Charge create'})
    } catch(err) {
        res.send('err')
    }
})

router.get('/test', (req, res) => {
    return res.send('fines')
})

module.exports = router