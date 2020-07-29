import React, { useState } from 'react'
import { profileUpdateValidation } from '../helpers/formValidation'
import { patchMethod } from '../helpers/fetch'
import { set } from 'mongoose'

const Profile = (props) => {
    const [errorMessage, setErrorMessage] = useState('') 

    const handleFormProfileSettingsSubmit = async (event) => {
        event.preventDefault()
        const form = document.querySelector('.profileDetailsForm')
        const formData = Object.fromEntries(new FormData(form).entries())
        const isFormDataValid = profileUpdateValidation(formData)

        if(isFormDataValid.isValid) {
            const route = `/api/users/update-profile/${props.user._id}`
           try {
                const updateResponse = await patchMethod(route, formData)
                if(updateResponse.data.status == 200) {
                    window.location.reload();
                }
           } catch(err) {
               setErrorMessage('Somethign went wrong please try again later')
           }
        } else {
            setErrorMessage(isFormDataValid.message)
        }
    }

    const dispayProfileDetailsForm = () => {
        const formContainer = document.querySelector('.profileDetailsForm')
        formContainer.classList.toggle('displayNone')
    }

    const displayChangePasswordForm = () => {
        const formContainer = document.querySelector('.changePassworForm')
        formContainer.classList.toggle('displayNone')
    }

    const handleFormPasswordChangeSubmit = async (event) => {
        event.preventDefault()
        const form = document.querySelector('.changePasswordForm')
        const formData = Object.fromEntries(new FormData(form).entries())

        const route = `/api/users/change-password/${props.user._id}`
        try {
            const updateResponse = await patchMethod(route, formData)
            if(updateResponse.data.status == 200) {
                setErrorMessage(updateResponse.data.message)
            } else {
                setErrorMessage(updateResponse.data.message)
            }
        } catch(err) {
            setErrorMessage('Somethign went wrong please try again later')
        }
        }

    return(
        <div>
            <h2>Your details:</h2>
            <p>First name: {props.user.firstName}</p>
            <p>Last name: {props.user.lastName} </p>
            <p>Email: {props.user.email} </p>

            <button onClick={dispayProfileDetailsForm}>Change profile details</button>
            <button onClick={displayChangePasswordForm}>Change password</button>

            <div className="profileDetailsForm displayNone">
                <h2>Profile settings</h2>
                <p>{ errorMessage }</p>
                <form className="loginForm profileDetailsForm" onSubmit={handleFormProfileSettingsSubmit}>
                    <label className="loginLabel">Email:</label>
                    <input className="loginInput" type="email" name="email" placeholder="email" />
                    <label className="loginLabel">First name:</label>
                    <input className="loginInput" type="text" name="firstName" placeholder="first name" />
                    <label className="loginLabel">Last name:</label>
                    <input className="loginInput" type="text" name="lastName" placeholder="last name" />
                    <input className="loginButton" type="submit" value="UPDATE" />
                </form>
            </div>

            <div className="changePassworForm displayNone">
                <h2>Profile settings</h2>
                <p>{ errorMessage }</p>
                <form className="loginForm changePasswordForm" onSubmit={handleFormPasswordChangeSubmit}>
                    <label className="loginLabel">Old Password:</label>
                    <input className="loginInput" type="password" name="oldPassword" />
                    <label className="loginLabel">New Password:</label>
                    <input className="loginInput" type="password" name="newPassword" />
                    <label className="loginLabel">Confirm New password:</label>
                    <input className="loginInput" type="password" name="newPasswordConfirm" />
                    <input className="loginButton" type="submit" value="UPDATE" />
                </form>
            </div>
        </div>
    )
}

export default Profile