import { SET_CATEGORY } from "./constants"

const initialState = {
    category: ''
}

export default function productReducer(state=initialState, {type, payload}){

    switch(type){
        case SET_CATEGORY:
            return { ...state, category: payload }
        default:
            return state
    }
}