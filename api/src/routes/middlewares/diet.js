const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/dietControllers') 

router.get('/', async(req,res)=>{
    let dietsType = await getDiets();
    res.status(200).json(dietsType)
})

module.exports = router;