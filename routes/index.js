const express = require('express');
const router = express.Router();
const { sendEmail } = require('../controllers/emailController');
const { smsWebhook } = require('../controllers/smsController');
const { getPricing, getCursos, getPriceDiscountManager, postPriceDiscountManager } = require('../controllers/pricingController');
const mailchimpRoutes = require('./mailchimpRoutes');
const getWordOfTheDay = require('../wordOfTheDay');
const userRoutes = require('./userRoutes'); // Ensure this is imported correctly

// Main routes
router.use('/', userRoutes); // Route for user-related actions

router.get('/', (req, res) => res.render('index'));
router.get('/login', (req, res) => res.redirect('/user/login')); // Redirect to user login route
router.get('/logout', (req, res) => res.redirect('/user/logout')); // Redirect to user logout route
router.get('/api/pricing', getPricing);
router.get('/cursos', getCursos);
router.post('/send-email', async (req, res) => {
  try {
    const { email, name, results } = req.body;
    await sendEmail(email, 'academico@onecultureworld.com', name, results);
    res.json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
router.post('/sms-webhook', smsWebhook);
router.use('/api', mailchimpRoutes);

// View routes
router.get('/terminos-y-condiciones', (req, res) => res.render('terminos-y-condiciones'));
router.get('/privacidad', (req, res) => res.render('privacidad'));
router.get('/thankyou', (req, res) => res.render('thankyou'));
router.get('/word-of-the-day', (req, res) => {
  const wordData = getWordOfTheDay();
  res.render('wordOfTheDay', { word: wordData });
});

// Price Discount Manager routes
router.get('/priceDiscountManager', getPriceDiscountManager);
router.post('/priceDiscountManager', express.urlencoded({ extended: true }), postPriceDiscountManager);

module.exports = router;
