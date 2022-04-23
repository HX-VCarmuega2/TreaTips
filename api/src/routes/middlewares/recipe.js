const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Recipe, Diet } = require('../../db.js');
const { joinRecipes } = require('../controllers/controllers.js')
const router = Router();
const diets = require('../controllers/AuxDiet')

router.post('/', async (req,res)=>{
    const {title, summary, diets, directions,score, healthScore } = req.body;
    if(!title || !summary) return res.status(404).send('Falta enviar datos obligatorios')
    const stringDirections = directions.map((el)=>{return el.step + '*'}).toString()
    const newRecipe = {
        title,
        summary,
        score,
        healthScore,
        directions: stringDirections
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
                return res.status(201).json({msg:'Receta creada con éxito'}) 
            } catch (error) {
                res.status(404).json({err: error}) 
            }
        }
        res.status(201).json({msg:'Receta creada con éxito'})
    } catch(error){
        res.status(404).json({error: error})
    }
})


router.get('/', async(req,res)=>{
    const {name} = req.query;
    const recipes = await joinRecipes();
    if(name){
        const words = name.split(" ")
        const recipesFiltered = recipes.filter(recipe => recipe.title.match(name));
        if(recipesFiltered.length > 0){
            return res.status(200).json(recipesFiltered)
        } else return res.status(404).json({error:'No se encontraron recetas'})
        
    }
    res.status(200).json(recipes)
})

router.get('/:id', async(req,res)=>{
    const { id } = req.params;
    const recipes = await joinRecipes();
    if(Number(id)){
        const recipe = recipes.find(recipe => recipe.id === Number(id));
        return res.status(200).json(recipe)
    }
    else {
        const idRaw = id.slice(2)
        const recipe = await Recipe.findOne({
            where: {id:idRaw},
            include:Diet
        });
        res.status(200).json(recipe)
    }
})



module.exports = router;