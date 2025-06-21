const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');

router.post('/shipment', shipmentController.createLoad);

module.exports = router;