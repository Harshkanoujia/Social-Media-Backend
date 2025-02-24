const express = require('express');
const { User, validateUserRegister } = require('../models/User');
const router = express.Router();

// create user
router.post('/', async ( req , res ) => {                                                 
    
    const {error} = validateUserRegister( req.body )
    if(error) return res.status(400).json({ msg: 'Validation failed', err: error.details[0].message })
              
    const savedUser = new User({
        username: req.body.username,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        password: req.body.password,
    })
    await savedUser.save()
    res.status(200).json({ msg: 'User Created Successfully', User : savedUser })
})

//get user 
router.get('/', async ( req , res ) => {                                                       
    
    const allUsers = await User.find();        
    if(allUsers.length === 0)  return res.status(400).json({ msg: 'No User Found !' })
    
    res.status(200).json({ "Users": allUsers })

})


module.exports = router;