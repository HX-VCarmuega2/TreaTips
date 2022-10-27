const axios = require('axios')
require('dotenv').config();
const { MY_API_KEY } = process.env;
const { Recipe, Diet } = require('../../db.js');

const url =`https://api.spoonacular.com/recipes/complexSearch?apiKey=${MY_API_KEY}&addRecipeInformation=true&number=10`

function generateRecipeFromApi(objeto){
    const {id,title,image,summary,diets, dishTypes,spoonacularScore,healthScore,analyzedInstructions} = objeto;
        let recipe = {
            id,
            title,
            image,
            summary,
            dishTypes,
            score: spoonacularScore,
            healthScore,
        };
        if(analyzedInstructions.length > 0){
            recipe.directions = analyzedInstructions[0].steps.map((steps)=> {return steps.step})
        } else {
            recipe.directions="";
        }
        let diet = diets.map(diet => {return {name:diet}})
        recipe.diets = diet;
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
    const recipes = await Recipe.findAll({
        include: {
            model: Diet,
            through: {
                attributes: []
            }
    }
});
    return recipes;
}

const joinRecipes = async () =>{
    let apiRecipes = await getApiRecipes();
    let dbRecipes = await getDBRecipes();
    let joinRecipes = dbRecipes.concat(apiRecipes);
    return joinRecipes;
}

const match = (array,name)=>{
    const words = name.toLowerCase().split(" ");
    const filterElements = [];
    array.forEach(elem => {
        const title = elem.title.toLowerCase();
        for(let i=0; i<words.length;i++){
            if(title.includes(words[i])){
                filterElements.push(elem);
                return
            }
        }
    })
    return filterElements
}

const createRecipe = async (recipeData, diets)=>{
    const newRecipe = await Recipe.create(recipeData);
    if(diets.length > 0){
        try {
           await newRecipe.addDiets(diets)
        return { message: "Recipe created successfully" } 
        } catch (error) {
            console.log(error)
        }
    }
}

const searchRecipe = async (id)=>{
    const recipes = await joinRecipes();
    let recipeFiltered;
    if(Number(id)){
        recipeFiltered = recipes.find(recipe => recipe.id === Number(id));
    }
    else {
        recipeFiltered = recipes.find(recipe => recipe.id === id); 
    }
    if (recipeFiltered) return recipeFiltered;
        else throw new Error(`The id ${id} does not correspond to a recipe`)
}

module.exports = {
    joinRecipes,
    match,
    createRecipe,
    searchRecipe
}