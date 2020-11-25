var express = require('express');
var router = express.Router();

var controller = require('./orders.controller');

router.post('/createOrders', controller.createOrder);
router.get('/orderList/:id', controller.getAllOrders);


module.exports = router;
