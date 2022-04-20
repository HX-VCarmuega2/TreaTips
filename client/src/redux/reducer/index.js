import { DISPLAY_RECIPES, FILTER_RECIPES_BY_DIET, GET_ALL_RECIPES, GET_RECIPES_BY_NAME, ORDER_RECIPES } from "../actions";
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
        case ORDER_RECIPES:
            if(action.payload === 'A-Z'){
                const newState = state.recipes.sort((a,b)=>{
                    if(a.title < b.title) return -1;
                    if(a.title > b.title) return 1;
                    else return 0;
                });
                return {
                    ...state,
                    recipes: newState,
                    recipesToDisplay: newState.slice(0,elements)
                }
            }
            else if(action.payload === 'Z-A'){
                const newState = state.recipes.sort((a,b)=>{
                    if(a.title < b.title) return 1;
                    if(a.title > b.title) return -1;
                    else return 0;
                });
                return {
                    ...state,
                    recipes: newState,
                    recipesToDisplay: newState.slice(0,elements)
                }
            }
            else if(action.payload === 'MIN'){
                console.log(state.recipes)
                const newState = state.recipes.sort((a,b)=>{
                    if(a.healthScore < b.healthScore) return -1;
                    if(a.healthScore > b.healthScore) return 1;
                    else return 0;
                });
                return {
                    ...state,
                    recipes: newState,
                    recipesToDisplay: newState.slice(0,elements)
                }
            }
            else if(action.payload === 'MAX'){
                const newState = state.recipes.sort((a,b)=>{
                    if(a.healthScore < b.healthScore) return 1;
                    if(a.healthScore > b.healthScore) return -1;
                    else return 0;
                });
                return {
                    ...state,
                    recipes: newState,
                    recipesToDisplay: newState.slice(0,elements)
                }
            }
            else {
                return {
                    state
                }
            }

        case FILTER_RECIPES_BY_DIET:
            const newState = state.recipes.filter(recipe => {return recipe.diets.includes(action.payload)})    
        return {
                ...state,
                recipes: newState,
                recipesToDisplay: newState.slice(0,elements)
            }
        default: 
            return state
    }
}

export default rootReducer;