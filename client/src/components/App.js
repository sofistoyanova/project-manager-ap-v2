import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Navigation from './Navigation'
import Login from './Login'
import Signup from './Signup'
import ProfileSettings from './ProfileSettings'
import Home from './Home'
import AddProject from './AddProject'
import Project from './Project'
import PasswordReset from './PasswordReset'
import { ProtectedRoute } from './ProtectedRoute'
import Logout from './Logout'
import { getMethod } from '../helpers/fetch'
import Profile from './Profile'


const App = () => {
    const [user, setUser] = useState({})

    const fetchUser = async () =>  {
        const res = await getMethod('/api/users/current-user')
        if(res.data.user) {
            window.localStorage.setItem('userId', res.data.user._id)
        }
        const user = res.data.user
        return user
    }

    useEffect(async () => {
        const user = await fetchUser()
        setUser(user)
    }, [])
        return(
            <div className="appContainer">
                <BrowserRouter>
                    <div className="container">
                        <Navigation user={user}></Navigation>
                        <div className="mainPageContainer">
                            <ProtectedRoute exact path='/'>
                                <Home />
                            </ProtectedRoute>
                            <ProtectedRoute exact path='/settings'>
                                <ProfileSettings />
                            </ProtectedRoute>
                            <ProtectedRoute exact path='/addProject'>
                                <AddProject />
                            </ProtectedRoute>
                            <ProtectedRoute exact path='/project'>
                                <Project />
                            </ProtectedRoute>
                            <ProtectedRoute exact path='/logout'>
                                <Logout />
                            </ProtectedRoute>
                            <ProtectedRoute exact path='/profileSettings'>
                                <Profile user={user} />
                            </ProtectedRoute>
                            <Route path='/login'><Login /></Route>
                            <Route path='/signup' component={Signup} />
                            <Route path='/passwordReset' component={PasswordReset} />
                            {/* <Route path='/settings' component={ProfileSettings} />
                            <Route path='/addProject' component={AddProject} />
                            <Route path='/project' component={Project} />
                            <Route path='/password-reset' component={PasswordReset} /> */}
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }

export default App