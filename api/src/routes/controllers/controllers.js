const axios = require('axios')
const { MY_API_KEY } = process.env;
const { Recipe } = require('../../db.js');

const url =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_API_KEY}&addRecipeInformation=true&number=2`

function generateRecipeFromApi(objeto){
    const {id,title,image,summary,diets,dishTypes,spoonacularScore,healthScore,analyzedInstructions} = objeto;
        let recipe = {
            id,
            title,
            image,
            summary,
            diets,
            dishTypes,
            score: spoonacularScore,
            healthScore,
        };
        if(analyzedInstructions.length > 0){
            recipe.directions=analyzedInstructions[0].steps.map((steps)=> {return steps.step})
        } else {
            recipe.directions=[];
        }
        return recipe;
}

const getApiRecipes = async() =>{
    var recipes = [];
    let response = await axios.get(url)
    response.data.results.map(recipe =>{
        let newRecipe = generateRecipeFromApi(recipe)
        recipes.push(newRecipe)})
    
    return recipes;
}

const getDBRecipes = async () => {
    const recipes = await Recipe.findAll();
    return recipes;
}

const joinRecipes = async () =>{
    let apiRecipes = await getApiRecipes();
    let dbRecipes = await getDBRecipes();
    let joinRecipes = dbRecipes.concat(apiRecipes);
    return joinRecipes;
}


module.exports = {
    joinRecipes
}