const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Recipe, Diet } = require('../../db.js');
const { joinRecipes, match, createRecipe } = require('../controllers/controllers.js')
const router = Router();
const { validateInput } = require('../validators/recipeValidator')

router.post('/', async (req,res,next)=>{
    try{
        validateInput(req.body)
        const response = await createRecipe(req.body, req.body.diets)
        res.status(201).json(response)
    } catch(err){
        res.status(404).json({error: err.message})
    }
})


router.get('/', async(req,res)=>{
    const {name} = req.query;
    const recipes = await joinRecipes();
    if(name){
        const recipesFiltered = match(recipes,name)
        if(recipesFiltered.length > 0){
            return res.status(200).json(recipesFiltered)
        } else return res.status(404).json({error:'No recipes found'})
        
    }
    res.status(200).json(recipes)
})

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    const recipes = await joinRecipes();
    if(Number(id)){
        const recipe = recipes.find(recipe => {return recipe.id === Number(id)});
        if (recipe) return res.status(200).json(recipe);
        else return res.status(404).json({err:`The id ${id} does not correspond to a recipe`})
    }
    else {
        const recipe = recipes.find(recipe => recipe.id === id);
        return res.status(200).json(recipe)
    }
})


module.exports = router;