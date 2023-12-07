const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
require('dotenv').config();

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
app.get('/', (req, res) => { res.render('index'); });

// Read pricing data and pass it to cursos.ejs
app.get('/cursos', (req, res) => {
  const pricingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'pricing.json'), 'utf-8'));
  res.render('cursos', { pricing: pricingData });
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
app.get('/price&discount-manager', (req, res) => {
  fs.readFile(path.join(__dirname, 'pricing.json'), 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading pricing file:", err);
      return res.status(500).send("Error loading pricing information");
    }
    const pricing = JSON.parse(data);
    res.render('priceManager', { pricing });
  });
});

app.post('/price&discount-manager', express.urlencoded({ extended: true }), (req, res) => {
  const newPricing = req.body;
  fs.writeFileSync(path.join(__dirname, 'pricing.json'), JSON.stringify(newPricing, null, 2));
  res.redirect('/price&discount-manager');
});

// 404 Error Handling
app.use((req, res, next) => { res.status(404).render('404'); });

// General Error Handling
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Internal Server Error');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
