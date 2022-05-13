export const ADD_TO_CART="ADD_TO_CART"
export const REMOVE_FROM_CART="REMOVE_FROM_CART"

export const addCart=(data)=>{
   return {type:ADD_TO_CART,payload:data}
}
export const removeCart=()=>{
   return {type:REMOVE_FROM_CART,payload:[]}
}