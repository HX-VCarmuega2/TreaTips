const diets = [{code:'GF', name: 'Gluten Free'},{code:'Ket', name:'Ketogenic'} , {code:'Vgt', name:'Vegetarian'}, {code:'LV', name: 'Lacto-Vegetarian'}, {code:'OV', name:'Ovo-Vegetarian'}, {code:'Vga',name:'Vegan'},{code:'Pct', name:'Pescetarian'},{code:'Plo', name:'Paleo'},{code:'Prl', name:'Primal'},{code:'LwF', name:'Low FODMAP'},{code:'W30',name:'Whole30'}]

const { Diet } = require('../../db.js');

const generateDiets = async()=>{
    diets.map(async(diet)=>{await Diet.create({diet})});
}