const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Require additional modules for security and rate limiting
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mailchimpRoutes = require('./routes/mailchimpRoutes');
const getWordOfTheDay = require('./wordOfTheDay');

// Apply security enhancements with Helmet, disabling CSP
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP
}));

// Apply rate limiting to specific routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use('/api', limiter); // Apply the rate limiter only to your API routes

// Serve static files
app.use(express.static('public'));

// Routes to render EJS templates
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/cursos', (req, res) => {
  res.render('cursos');
});

app.get('/terminos-y-condiciones', (req, res) => {
  res.render('terminos-y-condiciones');
});
app.get('/privacidad', (req, res) => {
  res.render('privacidad');
});
app.get('/thankyou', (req, res) => {
  res.render('thankyou');
});

app.get('/word-of-the-day', (req, res) => {
  const wordData = getWordOfTheDay(); // Get the word data
  res.render('wordOfTheDay', { word: wordData }); // Pass the data to the EJS template
});

app.use(express.json());

// Prefix routes with '/api'
app.use('/api', mailchimpRoutes);

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).render('404'); // Render a 404.ejs page if you have one, or send a 404 message
});

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
