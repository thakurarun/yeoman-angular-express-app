var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.sendfile( './Client/app/index.html');
});

module.exports = router;