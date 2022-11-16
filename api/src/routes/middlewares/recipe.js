const { Router } = require('express');
const { joinRecipes, match, createRecipe, searchRecipe, filterRecipesByDiets } = require('../controllers/recipeControllers.js')
const router = Router();
const { validateInput } = require('../validators/recipeValidator')

router.post('/', async (req,res)=>{
    try{
        validateInput(req.body)
        const response = await createRecipe(req.body, req.body.diets)
        res.status(201).json(response)
    } catch(err){
        res.status(404).json({error: err.message})
    }
})

router.get('/', async(req,res)=>{
    const {name, dietOne, dietTwo, dietThree} = req.query;
    try {
        let recipes = await joinRecipes();

        if(name){
            recipes = match(recipes,name)
        }
       
        if(dietOne){
            recipes = filterRecipesByDiets(recipes, dietOne)
        }
        if(dietTwo){
            recipes = filterRecipesByDiets(recipes, dietTwo)
        }
        if(dietThree){
            recipes = filterRecipesByDiets(recipes, dietThree)
        }

        if(recipes.length){
            res.status(200).json(recipes)
        } else {
            res.status(404).json({error: 'No recipes found'})
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        const recipe = await searchRecipe(id)
        res.status(200).json(recipe)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    
})


module.exports = router;