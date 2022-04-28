const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Recipe, Diet } = require('../../db.js');
const { joinRecipes, match } = require('../controllers/controllers.js')
const router = Router();
// const diets = require('../controllers/AuxDiet')

router.post('/', async (req,res)=>{
    const {title, summary, diets, directions, score, healthScore } = req.body;

    if(!title || !summary) return res.status(404).send({msg:'Mandatory information is missing. Check title and summary'})

    if(!Number(score)|| !Number(healthScore)) return res.status(404).send({msg:'Check the data types: score and health score must be of type Number'})

    // if(typeof(title !== 'string')||typeof(summary !== 'string')||typeof(directions !== 'string')) return res.status(404).send({msg:'Check the data types: title, summary and directions must be string'})

    // const stringDirections = directions.map((el)=>{return el.step + '*'}).toString()
    
    if(!Array.isArray(diets)) return res.status(404).send({msg:'Check the data types: diets must be of type Array'})

    const newRecipe = {
        title,
        summary,
        score,
        healthScore,
        directions,
    }
    try{
        const recipe = await Recipe.create(newRecipe);
        if(diets.length > 0){
            try {
                diets.map(async(diet)=>{
                    await Diet.findOrCreate({
                        where:{name:diet}
                    })
                    recipe.addDiets(diet)
                })
                return res.status(201).json({msg:'Recipe created successfully'}) 
            } catch (error) {
                return res.status(404).json(error) 
            }
        }
        res.status(201).json({msg:'Recipe created successfully'})
    } catch(error){
        res.status(404).json({err: error})
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
        const recipe = recipes.find(recipe => recipe.id === Number(id));
        if (recipe.length > 0) return res.status(200).json(recipe);
        else return res.status(404).json({err:'The id does not correspond to a recipe'})
    }
    else {
        const recipe = recipes.find(recipe => recipe.id === id);
        return res.status(200).json(recipe)
    }
})



module.exports = router;