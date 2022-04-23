const { Router } = require('express');
// const { where } = require('sequelize/types');
const { Op, Diet } = require('../../db.js');
const router = Router();

router.get('/', async(req,res)=>{
    let dietsType = await Diet.findAll();
    if(dietsType.length === 0){
        let diets = ['gluten free', 'ketogenic', 'vegetarian', 'acto vegetarian', 'lacto ovo vegetarian', 'vegan','pescetarian', 'paleo', 'primal', 'low FODMAP','whole30']
        try {
            diets.map(async(diet)=>{await Diet.create({name: diet})})
            dietsType = await Diet.findAll();
            return res.json(dietsType)
        } catch (error) { 
            res.json(error)
        }
    }
    res.json(dietsType)
})

module.exports = router;