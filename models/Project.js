const mongoose = require('mongoose')
const { Schema } = mongoose

// Create new model class
const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
    },
    description: {
        type: String,
    },
    _user: {
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    tasks: [{
        name: {type: String, required: true, minlength: 2},
        completed: {type: Boolean, required: true, default: 0}
    }]
})

// Create new collection and connect it to the projectSchema
mongoose.model('projects', projectSchema)