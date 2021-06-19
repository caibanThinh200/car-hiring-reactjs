import {combineReducers} from 'redux'
import carReducer from './car'
import userReducer from './user'
const rootReducer = combineReducers({
    car: carReducer,
    user: userReducer
})
export default rootReducer;