const mongoose = require('mongoose')
const { Schema } = mongoose
const validator = require('validator')

// Create new model class
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if(!validator.isEmail(email)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,

    },
    activationKey: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: 1
    },
    premium: {
        type: Boolean,
        required: true,
        default: 0
    },
    image: {
        type: String
    }
})

// Create new collection and connect it to the userSchema
mongoose.model('users', userSchema)