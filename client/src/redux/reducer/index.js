import { DISPLAY_RECIPES, GET_ALL_RECIPES, GET_RECIPES_BY_NAME } from "../actions";
export const elements = 9;

const initialState = {
    recipes: [],
    recipesToDisplay: []
}


const rootReducer = (state=initialState, action)=>{
    switch (action.type){
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                recipesToDisplay: action.payload.slice(0,elements)
              }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
                recipesToDisplay: action.payload.slice(0,elements)
            }
        case DISPLAY_RECIPES:
        const idxEnd = action.payload * elements;
        const idxStart = idxEnd -elements;
        const toDisplay = state.recipes.slice(idxStart,idxEnd)     
        return {
                ...state,
                recipesToDisplay: toDisplay
            }
        default: 
            return state
    }
}

export default rootReducer;