const { Router } = require('express');
const { joinRecipes, match, createRecipe, searchRecipe } = require('../controllers/recipeControllers.js')
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
    const {name} = req.query;
    try {
        const recipes = await joinRecipes();
        if(name){
            const recipesFiltered = match(recipes,name)
            if(recipesFiltered.length > 0){
                return res.status(200).json(recipesFiltered)
            } else return res.status(404).json({error:'No recipes found'})
            
        }
        res.status(200).json(recipes)   
    } catch (err) {
        res.status(404).json(err)
    }
})

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    try {
        const recipe = searchRecipe(id)
        res.status(200).json(recipe)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
    
})


module.exports = router;