const express = require('express');
const router = express.Router();

const rateQuoteController = require('../controllers/rateQuoteController');

router.post('/rateQuote', rateQuoteController.requestRateQuote);



module.exports = router;