
const validateInput = (body)=>{
    // const {title, summary, diets, directions, score, healthScore } = req.body;

    if(!body.title || !body.summary) throw new Error('Mandatory information is missing. Check title and summary')

    if(!Number(body.score)|| !Number(body.healthScore)) throw new Error ('Check the data types: score and health score must be of type Number')
    
    if(!Array.isArray(body.diets)) throw new Error('Check the data types: diets must be of type Array')
}

module.exports = {
    validateInput
}