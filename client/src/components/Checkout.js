import React, { Component } from 'react'
import ReactStripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Checkout extends Component {
    render() {        
        return (
            <ReactStripeCheckout
                name='Buy Premium'
                description='Create more than one project'
                amount={1000} 
                token={token => this.props.handleStripeToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
            >
                <button className="btn">Buy premium</button>
            </ReactStripeCheckout>
        )
    }
}

export default connect(null, actions)(Checkout)