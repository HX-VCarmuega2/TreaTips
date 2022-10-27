const { Router } = require('express');

// Importar routers
const middlewareRecipe = require('./middlewares/recipe.js')
const middlewareDiet = require('./middlewares/diet.js')
const middlewareAuth = require('./middlewares/auth')

const router = Router();

// Configurar los routers
router.use('/recipes',middlewareRecipe)
router.use('/diets',middlewareDiet)
router.use('/auth', middlewareAuth)

module.exports = router;
