const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Project = mongoose.model("projects")
const projectId = '5f0ddebd5bd6b16ef87050bc'

router.post('/create', async(req, res) => {
    const { projectName, projectDescription } = req.body
    if(!projectName) {
        return res.send({status: 400, message: 'Please add a project name'})
    }

    try {
        if(projectDescription) {
            const project = Project({
                name: projectName,
                description: projectDescription
            })
            await project.save()
            res.send(project)
        } else {
            const project = Project({
                name: projectName
            })
            await project.save()
            res.send(project)
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
        console.log(err)
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.delete('/delete/:id', async(req, res) => {
    const { id } = req.params
    const projectId = mongoose.Types.ObjectId(id)

    try {
        await Project.deleteOne({_id: projectId})
        res.send('ok')
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.post('/task/create', async(req, res) => {
    const { taskName } = req.body
    if(!taskName) {
        return res.send({status: 400, message: 'Please add a task name'})
    }

    try {
        const project = await Project.findById(projectId)
        project.tasks.push({name: taskName})
        project.save()
        res.send(project)
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

        if(completed) {
            await Project.updateOne({'tasks._id': taskId}, {$set: {'tasks.$.completed': true}})
        } else if(completed == 0) {
            await Project.updateOne({'tasks._id': taskId}, {$set: {'tasks.$.completed': false}})
        }

        return res.send('task')
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

router.patch('/task/delete/:id', async(req, res) => {
    const { id } = req.params
    const taskId = mongoose.Types.ObjectId(id)

    try {
        await Project.deleteOne({'tasks._id': taskId})
        res.send('ok')
    } catch(err) {
        res.send({status: 500, message: 'An error occur please try again later'})
    }
})

module.exports = router