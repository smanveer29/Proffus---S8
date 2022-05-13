export const LOGIN = "LOGIN";
export const SET_UPDATE_USER = "SET_UPDATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const LOGOUT = "LOGOUT";

export const userlogin = (user) => {
    return { type: LOGIN, payload: user }
}
export const setUpdateUser = () => {
    return { type: SET_UPDATE_USER, payload: true }
}
export const updateUser = (newChange) => {
    return { type: UPDATE_USER, payload: newChange }
}
export const userLogout = () => {
    return { type: LOGOUT, payload: null }
}