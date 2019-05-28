import {combineReducers} from 'redux'
import {Auth} from './auth'
import {Profile} from './profile'
import {Services} from './services'

const rootReducer = combineReducers({
    auth:Auth,
    profile:Profile,
    services: Services
})
export default rootReducer

