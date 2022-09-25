const { Router } = require('express');
const { encrypt, compare } = require('../../utils/crypt');
const { User } = require('../../db.js');

const router = Router();

router.post('/register', async (req,res)=>{
    const {password, email, name, lastname } = req.body

    if(!password || !email) res.status(404).send({msg:'Mandatory information is missing. Check email and password'})
    
    try {
        const user = await User.findOne({where: {email:email}})
        if(user) {
            res.status(400)
            .json({msg:"An user with this email already exist. Login or try other email"})}
        else {
            const encryptPassword = await encrypt(password)
            
            const user = await User.create({email,name,lastname,password:encryptPassword})
            res.status(201)
            .json({msg:"user register succesfully"})
        }
    } catch (error) {
        
        res.status(404).json(error)
    }
})

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!password || !email) res.status(404).send({msg:'Mandatory information is missing. Check email and password'})
    try {
        const user = await User.findOne({where: {email:email}})
        if(user) {
            const checkPassword = await compare(password, user.password);
            if(checkPassword) {

                res.status(200).json({userId: user.id})
            }
            else res.status(404).json({msg:"password invalid"})}
        else {
            res.status(404)
            .json({msg:"user don't exist"})
        }
    } catch (error) {
        res.status(404).json(error)
        
    }
})

module.exports = router