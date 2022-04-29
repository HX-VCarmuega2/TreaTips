import axios from 'axios'
export const URL = 'http://localhost:3001/recipes'

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const DISPLAY_RECIPES = 'DISPLAY_RECIPES'
export const ORDER_RECIPES = 'ORDER_RECIPES'
export const FILTER_RECIPES_BY_DIET = 'FILTER_RECIPES_BY_DIET'
export const GET_FAILED = 'GET_FAILED'
export const GET_REQUEST = 'GET_REQUEST'

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

const getFailed = (error) => {
    return {
        type: GET_FAILED,
        payload: error
    }
}

export const getAllRecipes = ()=>{
    return async function(dispatch) {
        dispatch(gettingData())
        const response = await axios.get(URL);
          const recipes = response.data;
          dispatch(getRecipes(recipes));
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
            dispatch(getFailed(error));
        })
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