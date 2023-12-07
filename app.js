const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
require('dotenv').config();

console.log("Starting server...");

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Additional modules for security and rate limiting
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mailchimpRoutes = require('./routes/mailchimpRoutes');
const getWordOfTheDay = require('./wordOfTheDay');

// Security enhancements with Helmet, disabling CSP
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Serve static files
app.use(express.static('public'));

// Routes for EJS templates
app.get('/', (req, res) => { 
  console.log("Accessing the home page");
  res.render('index'); 
});

app.get('/cursos', (req, res) => {
  console.log("Accessing the cursos page");
  try {
    const pricingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'pricing.json'), 'utf-8'));
    res.render('cursos', { pricing: pricingData });
  } catch (error) {
    console.error("Error reading pricing.json for cursos page:", error);
    res.status(500).send("Error loading cursos page");
  }
});

app.get('/terminos-y-condiciones', (req, res) => { res.render('terminos-y-condiciones'); });
app.get('/privacidad', (req, res) => { res.render('privacidad'); });
app.get('/thankyou', (req, res) => { res.render('thankyou'); });

app.get('/word-of-the-day', (req, res) => {
  const wordData = getWordOfTheDay(); 
  res.render('wordOfTheDay', { word: wordData });
});

app.use(express.json());

// Prefix routes with '/api'
app.use('/api', mailchimpRoutes);

// Pricing manager routes - Modified to read pricing data
app.get('/priceDiscountManager', (req, res) => {
  console.log("Accessing the priceDiscountManager page");
  fs.readFile(path.join(__dirname, 'pricing.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading pricing file for priceDiscountManager page:", err);
      return res.status(500).send("Error loading pricing information");
    }
    const pricing = JSON.parse(data);
    res.render('priceManager', { pricing });
  });
});

app.post('/priceDiscountManager', express.urlencoded({ extended: true }), (req, res) => {
  console.log("Posting data to priceDiscountManager");
  try {
    const newPricing = req.body;
    fs.writeFileSync(path.join(__dirname, 'pricing.json'), JSON.stringify(newPricing, null, 2));
    res.redirect('/priceDiscountManager');
  } catch (error) {
    console.error("Error writing to pricing.json from priceDiscountManager:", error);
    res.status(500).send("Error updating pricing information");
  }
});

// 404 Error Handling
app.use((req, res, next) => { 
  console.log("404 Error - Page not found: ", req.originalUrl);
  res.status(404).render('404'); 
});

// General Error Handling
app.use((error, req, res, next) => {
  console.error("General error:", error.stack);
  res.status(500).send('Internal Server Error');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
