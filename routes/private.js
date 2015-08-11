var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');

var jwt = require('jsonwebtoken');
var config = require('../config/app.config');


router.get('/dashoard', function (req, res) {
    res.contentType('application/json');
    res.send({ IsSuccess: true })
});

router.post('/logout', function (req, res) {
    if (req.headers.__auth) {
        if (jwt.verify(req.headers.__auth, config.secret)) {
            res.cookie('__auth', req.headers.__auth, { maxAge: -1, httpOnly: false });
            res.send({ IsValid: false });
        } else {
            res.send({ IsValid: false });
        }
    } else {
        res.send({ IsValid: false });
    }
});


module.exports = router;