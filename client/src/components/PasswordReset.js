import React, { useState } from 'react'
import { passwordResetValidation } from '../helpers/formValidation'
import { postMethod } from '../helpers/fetch'


const PasswordReset = () => {
    const [ errorMessage, setErrorMessage ] = useState('')

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const form = document.querySelector('form')
        const formData = Object.fromEntries(new FormData(form).entries())
        handleFormValidation(formData)
    }

    const handleFormValidation = async (formData) => {
        const isFormDataValid = passwordResetValidation(formData)
        if(isFormDataValid.isValid) {
            try {
                const route = '/api/users/forgot-password'
                let res = await postMethod(formData, route)
                res = res.data
                if(res.status === 200) {
                    setErrorMessage('Email sent with the new password')
                } else {
                    //console.log(res.message)
                    setErrorMessage('There was an error please try again later')
                }
            } catch(err) {
                console.log(err)
                //setErrorMessage('There was an error please try again later!')
            }
        } else {
            setErrorMessage(isFormDataValid.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <label>Type your email address</label>
                <p>{errorMessage}</p>
                <input type="email" name="email" placeholder="a@a.com" />
                <input type="submit" value="send" />
            </form>
        </div>
    )
}

export default PasswordReset