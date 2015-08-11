var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

var jwt = require('jsonwebtoken');
var config = require('../config/app.config');

router.get('/register', function (req, res) {
    res.contentType('application/json');
    res.send(newUser);
});
router.post('/register', function (req, res) {
    var newUser = new user();
    newUser.Name = req.body.Name;
    newUser.Email = req.body.Email;
    newUser.Password = req.body.Password;
    newUser.IsActive = true;
    user.findByCriteria({ 'Email' : newUser.Email }).then(function (user1) {
        if (user1) {
            res.send({ IsSuccess: false, Message : "User already exist with same email." })
        } else {
            newUser.save(function (err, createdUser) {
                if (err) {
                    console.log(err)
                    res.send({ IsSuccess: false })
                } else {
                    res.send({ IsSuccess: true })
                }
            });
        }
    });
});
router.post('/login', function (req, res) {
    var credentials = {};
    credentials.email = req.body.Email;
    credentials.password = req.body.Password;
    user.authenticate(credentials, function (err, result) {
        if (err) {
            console.log(err)
            res.send({ IsSuccess: false, Message : err })
        } else if (result.IsSuccess == false) {
            res.send({ IsSuccess: false, Message : result.Message })
        } else {
            var token = jwt.sign(result.User.Email + '|'+ result.User.Name, config.secret, {
                expiresInMinutes: 20 // expires in 20 minutes
            });
            res.cookie('__auth', token, { maxAge: 1200000, httpOnly: false });
            res.send({ IsSuccess: true, token : token, User : { Name : result.User.Name } })
        }
    });
});
router.post('/authenticate', function (req, res) {
    if (req.headers.__auth) {
        jwt.verify(req.headers.__auth, config.secret, function (err, decoded) {
            if (err) {
                res.cookie('__auth', req.headers.__auth, { maxAge: -1, httpOnly: false });
                res.send({ IsValid: false });
            } else {
                res.cookie('__auth', req.headers.__auth, { maxAge: 1200000, httpOnly: false });
                res.send({ IsValid: true, Name : decoded.split('|').slice(-1) });
            }
        });
    } else {
        res.send({ IsValid: false });
    }
   
});
module.exports = router;