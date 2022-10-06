const axios = require('axios')
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

module.exports = {
    joinRecipes,
    match
}