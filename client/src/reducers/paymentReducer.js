import { IS_PREMIUM } from '../actions/types'

export default function(state={}, action) {
    switch(action.type) {
        case IS_PREMIUM:
            //const isPremium = localStorage.getItem('isPremium')
            return  initialState()
            // return action.payload.data || false
            //return Object.keys(action.payload.data).length != 0 ? action.payload.data : false
        default:
            return initialState()
    }
}

function initialState () {
    let isPremium = localStorage.getItem('isPremium')
    isPremium = JSON.parse(isPremium)
    return isPremium
}