const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/dietControllers') 

router.get('/', async(req,res)=>{
    try {
        let dietsType = await getDiets();
        res.status(200).json(dietsType)
    } catch (err) {
        res.status(404).json({error:err.message})
    }
})

module.exports = router;