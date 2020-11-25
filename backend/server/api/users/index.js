var express = require('express');
var router = express.Router();

var controller = require('./users.controller');

router.post('/createuser', controller.createUsers);
router.get('/userList', controller.listOfUsers);


module.exports = router;
