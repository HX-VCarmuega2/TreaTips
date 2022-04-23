const diets = [{code:'GF', name: 'gluten free'},{code:'Ket', name:'ketogenic'} , {code:'Vgt', name:'vegetarian'}, {code:'LV', name: 'lacto vegetarian'}, {code:'OV', name:'lacto ovo vegetarian'}, {code:'Vga',name:'vegan'},{code:'Pct', name:'pescetarian'},{code:'Plo', name:'paleo'},{code:'Prl', name:'primal'},{code:'LwF', name:'low FODMAP'},{code:'W30',name:'whole30'}]

const { Diet } = require('../../db.js');

const generateDiets = async()=>{
    diets.map(async(diet)=>{await Diet.create({diet})});
}