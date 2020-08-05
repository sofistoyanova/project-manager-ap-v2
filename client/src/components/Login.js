import React, { useState, useEffect } from 'react'
import { userLoginValidation } from '../helpers/formValidation'
import { postMethod } from '../helpers/fetch'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from "react-router-dom"


const Login = (props) => {
    const [ loginStatusMessage, setLoginStatusMessage ] = useState('')
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } }

    useEffect(() => {
        if(window.localStorage.getItem('userId')) {
            window.location.replace("/")
        }
    })

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
                    const userId = loginResponse.message._id
                    window.localStorage.setItem('userId', userId)
                    window.location.replace("/")

                } else {
                    setLoginStatusMessage(loginResponse.message)
                }
            } catch(err) {
                setLoginStatusMessage('There was an error please try again later!')
            }
        } else {
            setLoginStatusMessage(isFormDataValid.message)
        }
    }

    return (
        <div>
            <div className="formContainerHeader">
                <h2>SIGN IN</h2>
                <p>or</p>
                <a href="/api/users/auth/google" className="blueButton">Use Google Account</a>
                <p>{loginStatusMessage != '' ? loginStatusMessage : ''}</p>
            </div>
            <div className="formContainer">
                <div className="formInnerContainer">
                    <form className="loginForm" onSubmit={handleFormSubmit}>
                        <label className="loginLabel">Email:</label>
                        <input className="loginInput" type="email" name="email" placeholder="email" required />
                        <label className="loginLabel">Password:</label>
                        <input className="loginInput" type="password" name="password" placeholder="password" required />
                        <Link to="/passwordReset" className="forgotPasswordLink">Forgot Password?</Link>
                        <input className="loginButton" type="submit" value="LOGIN" />
                    </form>
                </div>
            </div>
            <div className="loginLinkContainer">
                <Link to="/signup" className="underlineLink">Don’t have an account yet? Sign up here</Link>
            </div>
        </div>
    )
}

export default Login