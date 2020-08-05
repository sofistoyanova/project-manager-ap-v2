import { GET_CURRENT_USER, IS_PREMIUM } from './types'
import { getMethod, postMethod } from '../helpers/fetch'

export const getCurrentUser = () => {
    return (
        async(dispatch) => {
            const res = await getMethod('/api/users/current-user')
            // set local storage
            localStorage.setItem('auth', JSON.stringify(res))
            
            dispatch({ type: GET_CURRENT_USER, payload: res })
        }
    )
}

export const handleStripeToken = (token) => 
        async(dispatch) => {
            const res = await postMethod(token, '/api/payments/payment')
            alert(res.data.message)
            const checkoutButton = document.querySelector('.checkout')
            checkoutButton.classList.add('displayNone')
            // set local storage
            if(!localStorage.getItem('isPremium')){
                //localStorage.setItem('isPremium', JSON.stringify(res))
            }
            dispatch({type: IS_PREMIUM, payload: res})
        }

