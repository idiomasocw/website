const express = require('express');
const { getPriceDiscountManager, postPriceDiscountManager } = require('../controllers/pricingController');
const router = express.Router();

router.get('/priceDiscountManager', getPriceDiscountManager);
router.post('/priceDiscountManager', express.urlencoded({ extended: true }), postPriceDiscountManager);

module.exports = router;