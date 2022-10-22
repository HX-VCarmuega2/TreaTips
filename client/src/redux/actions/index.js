import axios from 'axios'
export const URL = '/recipes'
export const URL_TWO = '/types'

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const DISPLAY_RECIPES = 'DISPLAY_RECIPES'
export const ORDER_RECIPES = 'ORDER_RECIPES'
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET'
export const GET_REQUEST_FAILED = 'GET_REQUEST_FAILED'
export const GET_SEARCH_FAILED = 'GET_SEARCH_FAILED'
export const GET_REQUEST = 'GET_REQUEST'
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const CLEAN_DETAIL= 'CLEAN_DETAIL'
export const GET_ALL_DIETS = "GET_ALL_DIETS"

const gettingData = ()=> {
    return {
        type: GET_REQUEST
    }
}

const getRecipes = (recipes) => {
    return {
        type: GET_ALL_RECIPES,
        payload: recipes
    }
} 

const getRequestFailed = (error) => {
    return {
        type: GET_REQUEST_FAILED,
        payload: error
    }
}
const getSearchFailed = (error) => {
    return {
        type: GET_SEARCH_FAILED,
        payload: error
    }
}
const getDetail = (recipe) => {
    return {
        type: GET_RECIPE_BY_ID,
        payload: recipe
    }
}

export const getAllRecipes = ()=>{
    return async function(dispatch) {
        dispatch(gettingData())
        try {
            const response = await axios.get(URL);
            const recipes = response.data;
            dispatch(getRecipes(recipes));
        } catch (error) {
            dispatch(getRequestFailed(error));
        }
      };
}

export const getAllDiets = ()=>{
    return async function(dispatch) {
        dispatch(gettingData())
        try {
            const response = await axios.get(URL_TWO);
            console.log(response)
            const diets = response.data;
            dispatch({
                type: GET_ALL_DIETS,
                payload: diets
            });
        } catch (error) {
            dispatch(getRequestFailed(error));
        }
      };
}

export const getRecipesByName = (word) => {
    return function(dispatch) {
        dispatch(gettingData())
        axios.get(URL + `?name=${word}`)
        .then(function(response){
            const recipes = response.data
            dispatch(getRecipes(recipes));
        })
        .catch(function(error){
            dispatch(getSearchFailed("Recipe not found"));
        })
      };
}

export const getRecipesById = (id) => {
    return async function(dispatch) {
        try {
            const response = await axios.get(URL + `/${id}`);
            const recipe = response.data;
            dispatch(getDetail(recipe));
        } catch (error) {
            dispatch(getSearchFailed(error));
        }
      };
}


export const displayRecipes = (page)=>{
    return {
        type: DISPLAY_RECIPES,
        payload: page
    }
}

export const orderRecipes = (way)=>{
    return {
        type: ORDER_RECIPES,
        payload: way
    }
}

export const filterRecipes = (diet)=>{
    return {
        type: FILTER_RECIPES_BY_DIET,
        payload: diet
    }
}

export const setCurrentPage = (page)=>{
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}

export const cleanDetail = ()=>{
    return {
        type: CLEAN_DETAIL
    }
}
