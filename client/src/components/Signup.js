import React, { useState } from 'react'
import { userSignupValidation } from '../helpers/formValidation'
import { postMethod } from '../helpers/fetch'
import { Link } from 'react-router-dom'


const Signup = (props) => {
    const [ signupStatusMessage, setSignupStatusMessage ] = useState('')

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const form = document.querySelector('form')
        const formData = Object.fromEntries(new FormData(form).entries())
        handleFormValidation(formData)
    }

    const handleFormValidation = async (formData) => {
        const isFormDataValid = userSignupValidation(formData)

        if(isFormDataValid.isValid) {
            try {
                const route = '/api/users/signup'
                let signupResponse = await postMethod(formData, route)
                signupResponse = signupResponse.data
                if(signupResponse.status === 200) {
                    return setSignupStatusMessage('Check your email to validate your profile')
                } else {
                    setSignupStatusMessage(signupResponse.message)
                }
            } catch(err) {
                setSignupStatusMessage('There was an error please try again later!')
            }
        } else {
            setSignupStatusMessage(isFormDataValid.message)
        }
    }

    return (
        <div>
            {/* <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" required />
                <input type="password" name="password" placeholder="password" required />
                <input type="submit" value="LOGIN" />
            </form> */}
            <div className="formContainerHeader">
                <h2>SIGN UP</h2>
                <p>or</p>
                <a href="/api/users/auth/google" className="blueButton">Use Google Account</a>
                <p>{signupStatusMessage != '' ? signupStatusMessage : ''}</p>
            </div>
            <div className="formSignupContainer">
                <div className="formInnerContainer">
                    <form className="loginForm" onSubmit={handleFormSubmit}>
                        <label className="loginLabel">First Name:</label>
                        <input className="loginInput" type="text" name="firstName" placeholder="First Name" required />
                        <label className="loginLabel">Last Name:</label>
                        <input className="loginInput" type="text" name="lastName" placeholder="Last Name" required />
                        <label className="loginLabel">Email:</label>
                        <input className="loginInput" type="email" name="email" placeholder="email" required />
                        <label className="loginLabel">Password:</label>
                        <input className="loginInput" type="password" name="password" placeholder="password" required />
                        <label className="loginLabel">Confirm Password:</label>
                        <input className="loginInput" type="password" name="confirmedPassword" placeholder="password" required />
                        <input className="loginButton" type="submit" value="LOGIN" />
                    </form>
                </div>
            </div>
            <div className="loginLinkContainer">
                <Link to="/login" className="underlineLink">Don’t have an account yet? Sign in here</Link>
            </div>
        </div>
    )
}

export default Signup