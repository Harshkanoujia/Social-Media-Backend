const express = require('express');
const cookieParser = require("cookie-parser");
const reqlogger = require('./logger');

// routes
const Call = require('../routes/calls');
const User = require('../routes/users');
const Post = require('../routes/posts');
const Like = require('../routes/likes');
const Reply = require('../routes/replies');
const Comment = require('../routes/comments');

// error hanlding
const error = require('../middleware/errorHandling');



module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));                // Twilio ke request data ko parse karne ke liye
    app.use(cookieParser());                                        // parsing the token in cookies 
    
    app.use(reqlogger);
    
    app.use('/api/call', Call);
    app.use('/api/post', Post);
    app.use('/api/like', Like);
    app.use('/api/user', User); 
    app.use('/api/reply', Reply);
    app.use('/api/comment', Comment);

    app.use(error);
}