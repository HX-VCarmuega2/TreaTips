import axios from 'axios'
const URL = 'http://localhost:3001/recipes'

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_BY_NAME = 'GET_RECIPES_BY_NAME'


export const getAllRecipes = ()=>{
    return async function(dispatch) {
        const response = await axios.get(URL);
          const recipes = response.data;
          dispatch({ type: GET_ALL_RECIPES, payload: recipes });
      };
}

export const getRecipesByName = (word) => {
    return async function(dispatch) {
        const response = await axios.get(URL + `?name=${word}`);
          const recipes = response.data;
          dispatch({ type: GET_RECIPES_BY_NAME, payload: recipes });
      };
}