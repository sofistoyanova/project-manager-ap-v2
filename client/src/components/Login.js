import React, { Component } from 'react'
import { userLoginValidation } from '../helpers/formValidation'
import { postMethod } from '../helpers/fetch'


const Login = (props) => {
    const handleFormSubmit = (event) => {
        event.preventDefault()
        const form = document.querySelector('form')
        const formData = Object.fromEntries(new FormData(form).entries())
        handleFormValidation(formData)
    }

    const handleFormValidation = async (formData) => {
        const isFormDataValid = userLoginValidation(formData)

        if(isFormDataValid.isValid) {
            try {
                const route = '/api/users/login'
                let loginResponse = await postMethod(formData, route)
                loginResponse = loginResponse.data
                if(loginResponse.status === 200) {
                    // const userId = loginResponse.message.id
                    // props.setUserId(userId)
                    // return Auth.login(() => {
                    //     history.replace(from)
                    // })
                    console.log('success')
                } else {
                    console.log(loginResponse.message)
                }
            } catch(err) {
                console.log(err)
            }
        } else {
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" required />
                <input type="password" name="password" placeholder="password" required />
                <input type="submit" value="LOGIN" />
            </form>
        </div>
    )
}

export default Login