const express = require('express');
const router = express.Router();
const { sendLoginCode, verifyLoginCode, showDashboard, logout } = require('../controllers/userController');
const { getPricingData, getPriceDiscountManager } = require('../controllers/pricingController');

// Routes
router.get('/login', (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Clear the error after displaying it
  res.render('login', { error });
});

router.post('/send-login-code', sendLoginCode);

router.get('/send-login-code', (req, res) => {
  req.body.email = req.query.email;
  sendLoginCode(req, res);
});

router.get('/verify-code', (req, res) => {
  const message = req.session.message;
  const error = req.session.error;
  req.session.message = null; // Clear the message after displaying it
  req.session.error = null; // Clear the error after displaying it
  res.render('verify-code', { email: req.query.email, message, error });
});

router.post('/verify-login-code', verifyLoginCode);

router.get('/studentDashboard', showDashboard);

router.get('/priceManager', getPriceDiscountManager); // Use existing controller function to fetch and render pricing data

router.get('/logout', logout);

module.exports = router;
