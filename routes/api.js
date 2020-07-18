const express = require('express')
const app = express()

const userRoutes = require('./api/users')
const projectRoutes = require('./api/projects')
const paymentRoutes = require('./api/payments')

app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/payments', paymentRoutes)

module.exports = app