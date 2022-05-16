const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Diet } = require('../../db.js');
const router = Router();

const diets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'lacto ovo vegetarian', 'vegan','pescetarian', 'paleo', 'primal', 'low FODMAP','whole30']

async function createDiets(){
    diets.map(async(diet)=>{
        await Diet.findOrCreate({
            where:{name:diet}
        })
    })
}

async function getDiets (){
    let diets = await Diet.findAll();
    return diets;
}

router.get('/', async(req,res)=>{
    createDiets()
    let dietsType = await getDiets();
    res.status(200).json(dietsType)
})

module.exports = router;