import { GET_CURRENT_USER, IS_PREMIUM } from './types'
import { getMethod, postMethod } from '../helpers/fetch'

export const getCurrentUser = () => {
    return (
        async(dispatch) => {
            const res = await getMethod('/api/users/current-user')
            dispatch({ type: GET_CURRENT_USER, payload: res })
        }
    )
}

export const handleStripeToken = (token) => 
        async(dispatch) => {
            const res = await postMethod(token, '/api/payments/payment')
            // set local storage
            if(!localStorage.getItem('isPremium')){
                localStorage.setItem('isPremium', JSON.stringify(res))
            }
            dispatch({type: IS_PREMIUM, payload: res})
        }

