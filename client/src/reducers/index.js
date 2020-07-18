import { combineReducers } from 'redux'
import authReducer from './authReducer'
import paymentReducer from './paymentReducer'

export default combineReducers({
    auth: authReducer,
    isPremium: paymentReducer
})