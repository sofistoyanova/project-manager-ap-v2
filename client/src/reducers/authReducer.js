import { GET_CURRENT_USER } from '../actions/types'

export default function(state = {}, action) {
    switch(action.type) {
        case GET_CURRENT_USER:
            return action.payload.data || false
        default:
            return state
    }
}