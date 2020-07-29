import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import UserImage from '../assets/images/user.png'
//import { useHistory, useLocation } from "react-router-dom"
import Auth from './Auth'


class Navigation extends Component {

    renderNav() {
        const isLoggedIn = window.localStorage.getItem('userId') ? true : false
        let navContainer

        if(!isLoggedIn) {
            navContainer =  <div>
                                <Link to="/login" className="navLink">Login</Link>
                                <Link to="/signup" className="navLink">Signup</Link>
                             </div>
        } else {
            if(this.props.user.premium) {
                navContainer =  <div>
                                    <Link to="/profileSettings" className="navLink">Profile Settings</Link>
                                    <Link  to="/" className="navLink">My projects</Link>
                                    <Link to="/addProject" className="navLink">Create project</Link>
                                    <Link to="/logout" className="navLink">Logout</Link>
                                </div>
            } else {
                navContainer =  <div>
                <Link to="/profileSettings" className="navLink">Profile Settings</Link>
                <Link to="/" className="navLink">My projects</Link>
                <Link to="/addProject" className="navLink">Create project</Link>
                <Link to="/logout" className="navLink">Logout</Link>
                <li className="checkout"><Checkout /></li>
            </div>
            }
        }

        return navContainer
    }
    render() {
        return (    
            <div className="navWrapper">
                <div className="navAccountContainer">
                    <img className="accountImage" src={UserImage} />
                    <span className="accountuserName">Jerry Jone</span>
                </div>
                <div className="navLinksContainer">
                    {this.renderNav()}
                </div>
            </div>  
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth, isPremium: state.isPremium}
}

export default connect(mapStateToProps)(Navigation)