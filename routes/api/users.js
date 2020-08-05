const express = require("express")
const mongoose = require("mongoose")
const nodemailer = require('nodemailer')
const validator = require("validator")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const uuid = v4
const multer = require('multer')

// Set Storage Engine for multer
const storage = multer.diskStorage({
  destination:  function(req, file, cb) {
      cb(null, './client/src/uploads')
  },
  filename: function(req, file, cb) {
      cb(null, file.originalname )
  }
})

const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy

const router = express.Router()
const User = mongoose.model("users")
const { activateProfileEmail, resetPasswordEmail } = require('../../helpers/email-template')
const keys = require('../../config/keys')
const { route } = require("./projects")

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  req.session.user = req.user
  res.redirect('/')
})

// Nodemailer setup
const transporterObject = {
  service: 'Gmail', 
  auth: {
      port: 587,
      secure: false,
      user: keys.gmailEmail, 
      pass: keys.gmailPassword 
  }
}

let transporter = nodemailer.createTransport(transporterObject)

// Get current user
router.get('/current-user', async (req, res) => {
  // const { userId } = req.params
  // try {
  //   const user = await User.findById(userId)
  //   if(!user) {
  //     return res.send({user: ''})
  //   }
  //   return res.send({ user })
  // } catch(err) {
  //   console.log(err)
  // }
  return res.send(req.session)
})

//reset password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  if(!email) {
    return res.send({status: 400, message: 'Please enter an email'})
  }

  try {
    const [ user ] = await User.find({email: email})
    if(!user) {
      return res.send({status: 404, message: 'Email does not exists in the system'})
    }

    //generate new password
    const randomPassword = Math.random().toString(36).slice(-8)

    //hash password
    const hashedPassword = await bcrypt.hash(randomPassword, 3)

    // update the user password
    user.password = hashedPassword
    user.save()

    //send the new password to email
      // Send activation email
      const resetpasswordEmail = resetPasswordEmail(user, randomPassword)
      transporter.sendMail(resetpasswordEmail, (err, info) => {
          if(err) {
            return res.send({status: 500, message: err})
          }
          
          // Send response
          return res.send({status: 200, message: 'an email with the new password was sent to the provided email'})
        })
    //send respone
  } catch (err) {
    return res.send({status: 500, message: 'An error occur please try again later'})
  }
})

// Logout
router.get('/logout', (req, res) => {
  req.session = null
  res.redirect('/login')
})

// Activate profile
router.patch('/activate', async (req, res) => {
  const { key } = req.query
  
  try {
    const user = await User.findOne({ activationKey: key, active: 0 })
    if(!user) {
      return res.send({status: 404, message: 'The profile was not found or it was already activated'})
    }

    await User.updateOne({_id: user._id}, {active: true})
    return res.send({status: 200})
    if(!user) {
        return res.send({status: 404, message: 'The profile was not found or it was already activated'})
    }

  } catch(err) {
      res.send({status: 500, message: err.message})
  }
})

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) {
    return res.send({status: 400, message: 'Fillin all user details'})
  }

  try {  
    const user = await User.findOne({ email })
    if(!user) {
      return res.send({ status: 404, message: 'Wrong email or password' })
    }

    const activeProfile = user.active
    const userPassword = user.password

    const doPasswordsMatch = await bcrypt.compare(password, userPassword)

    if(!doPasswordsMatch) {
      return res.send({ status: 404, message: 'Wrong email or password' })
    }

    if(!activeProfile) {
      return res.send({status: 400, message: 'Please activate your profile before login'})
    }

    req.session.user = user
    return res.send({status: 200, message: user})

  } catch(err) {
    return res.send({ status: 500, message: err.message })
  }

})

router.patch('/update-profile/:userId', async (req, res) => {
  const {userId} = req.params

  //const { firstName, lastName, email } = req.body
  const updates = Object.keys(req.body)
  const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
  const isValidUpdate = updates.every((update) => {
    return allowedUpdates.includes(update)
  })

  if(!isValidUpdate) {
    return res.send({status: 400, message: 'Update is invalid'}) 
  }

  try {
    let user = await User.findById(userId)

    if(!user) {
      return res.send({status: 404, message: 'User not found'})
    }

    updates.map((update) => {
      if(req.body[update] != '') {
        user[update] = req.body[update]
      }
    })

    user = await user.save()
    req.session.user = user
    return res.send({status: 200, message: 'Updated'})
  } catch(err) {
    return res.send({ status: 500, message: 'Something went wrong please try again later' })
  }
})

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body

  if (!email || !password || !confirmedPassword || !firstName || !lastName) {
    return res.send({
      status: 400,
      message: "Please fill in all user details",
    })
  } else if (firstName.length < 2) {
    return res.send({
      status: 400,
      message: "First name should contain at least 2 characters",
    })
  } else if (lastName.length < 2) {
    return res.send({
      status: 400,
      message: "Last name should contain at least 2 characters",
    })
  } else if (password.length < 7) {
    return res.send({
      status: 400,
      message: "Password should contain at least 7 characters",
    })
  } else if (password !== confirmedPassword) {
    return res.send({ status: 400, message: "Passwords did not match" })
  } else if (!validator.isEmail(email)) {
    return res.send({ status: 400, message: "Email is not in valid format" })
  } else {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, keys.saltedRounds)

      // Check if email exists
      const existingEmail = await User.findOne({ email })
      if(existingEmail) {
        return res.send({status: 400, message: 'Email already exists'})
      }

      // Save user
      const user = User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        activationKey: uuid()
      })
      
      await user.save()

      // Send activation email
      // const activationEmail = activateProfileEmail(user)
      // transporter.sendMail(activationEmail, (err, info) => {
      //     if(err) {
      //         return res.send({status: 500, message: 'Error sending activation email'})
      //     }
          
      //     // Send response
      //     return res.send({status: 200, message: 'User registered'})
      // })
      return res.send({ status: 200, message: 'Registered! pleade go to login' })
    } catch(err) {
      return res.send({ status: 400, message: err.message })
    }
    // new User({
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    // })
    // .save()
    // .then((user) => {
    //   return res.send({ status: 200, message: user })
    // })
    // .catch((err) => {
    //   return res.send({ status: 400, message: err.message })
    // })
  }
})

const upload = multer({ storage: storage })
router.patch('/update-profile-image/:userId', upload.single('file'), async(req, res) => {
  const file = req.file
  const {userId} = req.params
  console.log(typeof file)
  console.log(file.originalname)

  try {
    const user = await User.findById(userId)
    if(!user) {
      return res.send({ status: 404, message: 'User id not found' })
    }

    user.image = file.originalname
    
    await user.save()
    req.session.user = user

    return res.send({status: 200, message: 'Image was uploade. Please refresh the page to see the update!'})
  } catch(err) {
    console.log(err)
    return res.send({status: 500, message: 'There was an error please try again later'})
  }

})

router.patch('/change-password/:userId', async (req, res) => {
  const {userId} = req.params
  const {oldPassword, newPassword, newPasswordConfirm} = req.body

  try {
    const user = await User.findById(userId)
    if(!user) {
      return res.send({ status: 404, message: 'User id not found' })
    }

    const userPassword = user.password
    const doPasswordsMatch = await bcrypt.compare(oldPassword, userPassword)
    if(!doPasswordsMatch) {
      return res.send({status: 400, message: 'Old passowrd wrong'})
    }

    if(newPassword != newPasswordConfirm) {
      return res.send({status: 400, message: 'New password did not match'})
    } else if(newPassword.length < 7 ) {
      return res.send({status: 400, message: 'Password should contain at least 7 characters'})
    }

    const hashedPassword = await bcrypt.hash(newPassword, 3)
    user.password = hashedPassword
    await user.save()
    return res.send({status: 200, message: 'Password was changed'})
  } catch(err) {
    res.send({status: 200, message: 'There was an error, please try again later'})
  }
})

// register with google

module.exports = router
