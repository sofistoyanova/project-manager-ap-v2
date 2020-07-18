import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'
import { getMethod } from '../helpers/fetch'

class Navigation extends Component {
    renderNav() {
        const isLoggedIn = Object.keys(this.props.auth).length > 0
        let navContainer

        console.log('props2', this.props)
        if(!isLoggedIn) {
            navContainer = <Link to='login'>Login</Link>
        } else {
            if(this.props.isPremium != null || this.props.auth.user.premium) {
                navContainer = <li><a href='/api/users/logout'>Logout</a></li>
            } else {
                navContainer =  <div>  
                                    <li><a href='/api/users/logout'>Logout</a></li>
                                    <li><Checkout /></li>
                                </div>
            }
        }

        return navContainer
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                <a href="#" className="brand-logo">Logo</a>
                <ul className="right">
                    {this.renderNav()}
                    {/* <li><Checkout /></li> */}
                </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { auth: state.auth, isPremium: state.isPremium}
}

export default connect(mapStateToProps)(Navigation)