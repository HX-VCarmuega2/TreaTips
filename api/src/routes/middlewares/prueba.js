const recipes = [{title: "Arroz con pollo"},{title:"pastel de papa"},{title:"torta de arandanos"}];

const word = "pollo"

const filteredWords = recipes.filter(recipe => recipe.title.includes(word))

console.log(filteredWords)