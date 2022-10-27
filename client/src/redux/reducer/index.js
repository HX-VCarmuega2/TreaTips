import { DISPLAY_RECIPES, FILTER_RECIPES_BY_DIET, GET_ALL_RECIPES, GET_REQUEST_FAILED, GET_SEARCH_FAILED, GET_REQUEST, ORDER_RECIPES, GET_RECIPE_BY_ID, SET_CURRENT_PAGE, CLEAN_DETAIL, GET_ALL_DIETS } from "../actions";
export const elements = 9;
export const diets = ['gluten free','ketogenic','vegetarian', 'lacto vegetarian','ovo lacto vegetarian','vegan','pescetarian','paleo','primal','low FODMAP','whole30']

const initialState = {
    loading: false,
    recipes: [],
    diets:[],
    recipesToDisplay: [],
    recipeDetail:{},
    errors: {
        request: '',
        search:''
    },
    page: 1
}


const rootReducer = (state=initialState, action)=>{
    switch (action.type){
        case CLEAN_DETAIL:
            return {
                ...state,
                recipeDetail:[]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page:action.payload
            }
        case GET_REQUEST:
            return {
                ...state,
                loading:true,
                errors: {
                    request: '',
                    search:''
                }
            }
        case GET_ALL_DIETS:
            return {
                ...state,
                diets: action.payload,
                loading: false,
            }
        case GET_ALL_RECIPES:
            return {
                ...state,
                loading: false,
                recipes: action.payload,
                recipesToDisplay: action.payload.slice(0,elements),
                errors:{
                    request: '',
                    search:''
                },
                page:1
              }
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipeDetail: action.payload,
            }      
        
        case DISPLAY_RECIPES:
        const idxEnd = action.payload * elements;
        const idxStart = idxEnd -elements;
        const toDisplay = state.recipes.slice(idxStart,idxEnd)     
        return {
                ...state,
                recipesToDisplay: toDisplay
            }
        case GET_REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                recipes: [],
                recipesToDisplay: [],
                errors: {...state.errors, request:action.payload}
            }
        case GET_SEARCH_FAILED:
            return {
                ...state,
                loading: false,
                recipes: [],
                recipesToDisplay: [],
                errors: {...state.errors, search:action.payload}
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
            const newState = [];
            
            state.recipes.forEach(recipe => {
                recipe.diets.forEach(diet=>{
                    if(diet.name === action.payload){
                        newState.push(recipe)
                    }
                })
            })

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