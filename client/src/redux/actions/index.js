import axios from 'axios'
const URL = 'http://localhost:3001/recipes'

export const GET_ALL_RECIPES= 'GET_ALL_RECIPES'


export const getAllRecipes = ()=>{
    return async function(dispatch) {
        const response = await axios.get(URL);
          const recipes = response.data;
          dispatch({ type: GET_ALL_RECIPES, payload: recipes });
      };
}