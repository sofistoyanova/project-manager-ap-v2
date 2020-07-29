import { GET_CURRENT_USER } from '../actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case GET_CURRENT_USER:
            return  initialState()
        default:
            return initialState()
    }
}

function initialState () {
    let auth = localStorage.getItem('auth')
    auth = JSON.parse(auth)
    return auth
}