const Joi = require('joi')
const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    username: { type: String },                                                                                                                                                         
    email: { type: String, unique: true },                                                                                                                                                               
    password: { type: String }, 
    token: String,                                                                                                                                                                           
}))                           
       

function validateUserRegister(user){
    const Schema = Joi.object({
        username: Joi.string(),
        email: Joi.string().email().required(),    
        password: Joi.string().required(),
    })
    return Schema.validate(user)
}

function validateUserLogin(user){
    const Schema = Joi.object({
        email: Joi.string().email().max(150).trim(),    
        phoneNo: Joi.string().min(10).max(12),
        password: Joi.string().min(6).max(250).required(),
    })
    return Schema.validate(user)
}

function validateUserUpdate(user){
    const Schema = Joi.object({
        username: Joi.string().allow("").allow(null),
        email: Joi.string().email().allow("").allow(null),    
        password: Joi.string().allow("").allow(null),
    })
    return Schema.validate(user)
}


module.exports = {
    User,
    validateUserRegister,
    validateUserLogin,
    validateUserUpdate
}