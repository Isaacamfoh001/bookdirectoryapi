const {User} = require('../models/user');
const { verifyToken, verifyTokenAndAuthorization } = require('../middleware/verifyToken');
const router = require('express').Router();

router.get('/all', [verifyTokenAndAuthorization], async(req, res)=>{
    
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).send(users);
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/:id', [verifyToken], async(req, res)=>{
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, { $set:req.body}, {new: true});
        if(!user) return res.status(404).send('User cannot be found');
        console.log(user);
        res.status(200).send('Successfully Updated');
        
    } catch (error) {
        res.status(400).send(error);
        
    }
    
});

router.delete('/:id',[verifyToken], async(req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).send('User does not exist');
        res.status(200).send('Succesfully deleted account');   
    } catch (error) {
        res.status(400).send(error);
        
    }
    
});
module.exports = router;