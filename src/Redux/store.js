import {createStore,combineReducers} from 'redux'
import cartReducer from './Reducers/cartReducer'
import userReducer from './Reducers/userReducer'
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
})

const store = createStore(rootReducer)

export default store