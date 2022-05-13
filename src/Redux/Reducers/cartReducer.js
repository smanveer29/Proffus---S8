import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

let defaultState = {
    items:[]
}
export default cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return{...state,items:action.payload}
        }
        case REMOVE_FROM_CART: {
            return {...state,items:[]}
        }
        default:
            return state;
    }
}

export const selectCartItems=(state)=>state.cart.items