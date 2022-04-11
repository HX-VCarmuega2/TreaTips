const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const middlewareRecipe = require('./middlewares/recipe.js')
const middlewareDiet = require('./middlewares/diet.js')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes',middlewareRecipe)
router.use('/types',middlewareDiet)

module.exports = router;
