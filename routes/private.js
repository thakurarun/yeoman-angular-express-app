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

module.exports = router;