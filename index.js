const cookigSession = require('cookie-session')
const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

require('./models/User')
require('./models/Project')

require('./services/passport')

mongoose
    .connect(keys.mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));


const app = express()
//app.use(bodyParser.json()); // <--- Here


app.use(
    cookigSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
) 

app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5001")
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Credentials", true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")
    next()
})

const apiRoutes = require('./routes/api')
app.use('/api', apiRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
 

const PORT = process.env.PORT || 5001
app.listen(PORT)