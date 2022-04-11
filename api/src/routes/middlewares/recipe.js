const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Recipe, Diet } = require('../../db.js');
const { joinRecipes } = require('../controllers/controllers.js')
const router = Router();
const diets = require('../controllers/AuxDiet')

router.post('/', async (req,res)=>{
    const {title, summary, diets } = req.body;
    if(!title || !summary) return res.status(404).send('Falta enviar datos obligatorios')
    try{
        const recipe = await Recipe.create(req.body);
        if(diets.length > 0){
            try {
                const newDiets = diets.map(async(diet)=>{
                    await Diet.findOrCreate({
                        where:{name:diet}
                    })
                })
                recipe.addDiets(diets) 
            } catch (error) {
                res.json(error) 
            }
        }
        res.status(201).json({msg:'Receta creada con éxito'})
    } catch(error){
        res.status(404).json({error:'Error en alguno de los datos previstos'})
    }
})

//trabajando en una funcion para encontrar varias palabras en un string
const findWord = (title,words)=>{
    words.forEach()

}

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