import React, { useState } from 'react'
import { postMethod } from '../helpers/fetch'
import { createTaskValidation } from '../helpers/formValidation'

const CreateTask = (props) => {
    const [ createTaskMessage, setCreateTaskMessage ] = useState('')
    const projectId= props.projectId

    const displayForm = (event) => {
        event.preventDefault()
        const createTaskForm = document.querySelector('.createTaskForm')
        createTaskForm.classList.toggle('displayBlock')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const form = document.querySelector('form')
        const formData = Object.fromEntries(new FormData(form).entries())
        handleFormValidation(formData)
    }

    const handleFormValidation = async (formData) => {
        const isFormDataValid = createTaskValidation(formData)

        if(isFormDataValid.isValid) {
            try {
                const route = `/api/projects/task/create?projectId=${projectId}`
                let signupResponse = await postMethod(formData, route)
                signupResponse = signupResponse.data
                if(signupResponse.status === 200) {
                    const { onTaskCreate } = props
                    onTaskCreate()
                    return setCreateTaskMessage('Task created')
                } else {
                    setCreateTaskMessage(signupResponse.message)
                }
            } catch(err) {
                setCreateTaskMessage('There was an error please try again later!')
            }
        } else {
            setCreateTaskMessage(isFormDataValid.message)
        }
    }

    return(
        <div>
            <button className="addTaskButton" onClick={displayForm}>+ Add Task</button>
            <form className="createTaskForm" onSubmit={handleFormSubmit}>
                <p className="message">{ createTaskMessage }</p>
                <input type="hidden" />
                <label className="loginLabel">Task Name:</label>
                <input className="loginInput" type="text" name="taskName" placeholder="Task Name" required />
                <input className="createTaskButton" type="submit" value="+ Create" />
            </form>
        </div>
    )
}

export default CreateTask