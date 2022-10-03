import {GETPOST, ADDPOST, EDITPOST, DELETEPOST} from '../types'

const initValue = {
    post: [],
    loading: false,
    msg: null,
}

export const postReducer = (state = initValue, action) =>{
    console.log("Action in post", action)

    if (action.type === GETPOST){
        return{...state, post: action.payload }
    }
    if (action.type === ADDPOST){
        return{...state, post: action.payload }
    }
    if (action.type == EDITPOST){
        return{...state, post: action.payload }
    }
    if (action.type == DELETEPOST){
        return{...state, post: action.payload }
    }

    return state
}