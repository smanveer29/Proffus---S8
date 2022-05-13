import { LOGIN, LOGOUT } from "../actions/user"

const initialState = {
   user: null,
   access_token: null
}
const userReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN: {
         console.log(action.payload, "payload user")
         return { ...state, user: action.payload,access_token:action.payload.token }
      }
      case LOGOUT: {
         return { ...state, user: null }
      }
      default:
         return state
   }
}


export const selectUser = state => state.user.user;
export const selectAccessToken = state => state.user.access_token;

export default userReducer