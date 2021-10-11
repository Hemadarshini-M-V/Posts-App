var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
const user = require('../models/user');

// Creating an instance of Express router
var router = express.Router();

router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash 
        });
        user.save().then(result => {
            res.status(201).json({
                message: 'User created',
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    });
   
});

router.post("login", (req, res, next)=> {
    User.findOne({email: req.body.email}).then(user => {
        if(!user) {
            res.status(401).json({
                message: "User not found"
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    }).then(result=> {
        if(!result) {
            res.status(401).json({
                message: "Authentication failed"
            });
        }
        const token = jwt.sign(
            {userId: user._id, email: user.email}, 
            "Radha_Krishna_Hare_Hare", 
            {expiresIn: "1h"});
    })
    .catch(err => {
        res.status(401).json({
            message: "Authentication failed"
        });
    })
});

module.exports = router;