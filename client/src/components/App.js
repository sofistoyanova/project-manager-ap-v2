import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Navigation from './Navigation'
import Login from './Login'


const Dashboard = () => <h2>Dashboard</h2>
const Home = () => <h2>Home</h2>

class App extends Component {
    componentDidMount() {
        this.props.getCurrentUser()
    }
    render() {
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Navigation></Navigation>
                        <div className="container">
                            <Route exact path='/' component={Home} />
                            <Route path='/dashboard' component={Dashboard} />
                            <Route path='/login' component={Login} />
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App)