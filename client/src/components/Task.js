import React from 'react'
import { patchMethod } from '../helpers/fetch'
import checkImage from '../assets/images/check.png'
import uncheckImage from '../assets/images/uncheck.png'


const Task = (props) => {
    const handleFormSubmit = async(event) => {
        event.preventDefault()
        const form = document.querySelector('form')
        const formData = Object.fromEntries(new FormData(form).entries())
        
        if(!formData.completed) {
            formData.completed = 0
        }
        let updateTaskResponse = await patchMethod(`/api/projects/task/update/${props.taskId}`, formData)
       updateTaskResponse = updateTaskResponse.data

       if(updateTaskResponse.status == 200) {
            props.onTaskUpdate()
        }
    }

    const updateTask = async () => {
        const updateTaskForm = document.querySelector('.updateTaskForm')
        updateTaskForm.classList.toggle('displayBlock')
    }

    const deleteTask = async () => {
        let deleteTaskResponse = await patchMethod(`/api/projects/task/delete/${props.taskId}`)
       deleteTaskResponse = deleteTaskResponse.data

       if(deleteTaskResponse.status == 200) {
           props.onTaskUpdate()
       }
    }

    return(
        <div className="task">
            <div className="taskDetails">
                <div className="checkImageContainer"><img className="checkImage" src={props.taskStatus ? checkImage : uncheckImage} /></div>
                <div className="taskName">{props.taskName}</div>
                {/* <div className="taskDueDate">26.04.2019</div> */}
                <button onClick={updateTask}>update</button>
                <button onClick={deleteTask}>delete</button>
            </div>
            <form className="updateTaskForm" onSubmit={handleFormSubmit}>
                <label className="loginLabel">Task Name:</label>
                <input className="loginInput" type="text" name="taskName" placeholder="Task Name" />
                <label className="loginLabel">Complete</label>
                <input type="checkbox" name="completed" />
                <input className="createTaskButton" type="submit" value="update" />
            </form>
        </div>
    )
}

export default Task