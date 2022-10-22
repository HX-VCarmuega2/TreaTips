const { Diet } = require('../../db.js');

const diets = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian', 'lacto ovo vegetarian', 'vegan','pescetarian', 'paleo', 'primal', 'low FODMAP','whole30']

async function createDiets(){
    let DBdiets = await Diet.findAll();
    try {
        if(!DBdiets.length){
            diets.map(async(diet)=>{
                await Diet.create({name:diet})
            })
            console.log("dietas creadas")
        } else{
            console.log('ya estan las dietas cargadas')
        }
        
    } catch (error) {
        console.log(error.message)
    }

}

async function getDiets (){
    let diets = await Diet.findAll();
    return diets;
}

module.exports = {
    createDiets,
    getDiets
}