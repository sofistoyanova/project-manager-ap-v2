const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Project = mongoose.model("projects")
const User = mongoose.model('users')
//const projectId = '5f0ddebd5bd6b16ef87050bc'

router.post('/create', async(req, res) => {
    const { projectName, projectDescription } = req.body
    if(!projectName) {
        return res.send({status: 400, message: 'Please add a project name'})
    }

    try {
        const user = await User.findById(req.session.user._id)
        const previousProjects = await Project.find({_user: req.session.user._id})

        if(previousProjects.length >= 1) {
            if(!user.premium) {
                return res.send({status: 400, message: 'You should be a premium user in order to create more than 1 project'})
            }
        }
        if(projectDescription) {
            const project = Project({
                name: projectName,
                description: projectDescription,
                _user: req.session.user._id
            })
            await project.save()

            res.send({status: 200, message: 'Project created'})
        } else {
            const project = Project({
                name: projectName,
                _user: req.session.user._id
            })
            await project.save()
            res.send({status: 200, message: 'Project created'})
        }
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.patch('/update/:id', async(req, res) => {
    const { id } = req.params
    const { projectName } = req.body
    const { projectDescription } = req.body

    const projectId = mongoose.Types.ObjectId(id)

    try {
        if(projectName) {
            await Project.updateOne({_id: projectId}, {$set: {'name': projectName}})
        } 

        if(projectDescription) {
            await Project.updateOne({_id: projectId}, {$set: {'description': projectDescription}})
        }

        return res.send('project')
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params
    const projectId = mongoose.Types.ObjectId(id)

    try {
        await Project.deleteOne({_id: projectId})
        res.send({status: 200, message: 'deleted'})
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.post('/task/create', async(req, res) => {
    const { taskName } = req.body
    const { projectId } = req.query
    if(!taskName) {
        return res.send({status: 400, message: 'Please add a task name'})
    }

    try {
        const project = await Project.findById(projectId)
        project.tasks.push({name: taskName})
        project.save()
        res.send({status: 200, message: 'task created'})
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.patch('/task/update/:id', async(req, res) => {
    const { id } = req.params
    const { taskName } = req.body
    const { completed } = req.body

    const taskId = mongoose.Types.ObjectId(id)

    try {
        if(taskName) {
            await Project.updateOne({'tasks._id': taskId}, {$set: {'tasks.$.name': taskName}})
        } 
        let taks = ''
        if(completed) {
            task = await Project.updateOne({'tasks._id': taskId}, {$set: {'tasks.$.completed': true}})
        } else if(completed == 0) {
            task = await Project.updateOne({'tasks._id': taskId}, {$set: {'tasks.$.completed': false}})
        }

        return res.send({status: 200, message: 'updated'})
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.patch('/task/delete/:id', async(req, res) => {
    const { id } = req.params
    const taskId = mongoose.Types.ObjectId(id)

    try {
        const [project] = await Project.find({'tasks._id': taskId})
        const tasks = project.tasks
        tasks.pull({_id: taskId})
        project.save()

        res.send({status: 200, message: 'deleted'})
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later2'})
    }
})

router.get('/', async(req, res) => {
    const { userId } = req.query
    try {
        const projects = await Project.find({_user: userId})
        if(projects.length > 0) {
            return res.send({status: 200, message: projects})
        } else {
            return res.send({status: 404, message: 'Projects were not found'})
        }
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.get('/project', async(req, res) => {
    const { projectId } = req.query
    try {
        const project = await Project.findOne({_id: projectId})
        if(project) {
            return res.send({status: 200, message: project})
        } else {
            return res.send({status: 404, message: 'Project was not found'})
        }
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})


module.exports = router