const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

// Require additional modules for security and rate limiting
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mailchimpRoutes = require('./routes/mailchimpRoutes');
const getWordOfTheDayHtml = require('./wordOfTheDay');

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

// Redirect middleware for old .html URLs
app.get('*.html', (req, res) => {
  const newPath = req.path.slice(0, -5); // Remove .html extension
  res.redirect(301, newPath);
});

// Serve static files without .html extension
app.use(express.static('public', {
  extensions: ['html']
}));

// Home page route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Optionally, redirect from '/index.html' to '/'
app.get('/index.html', (req, res) => {
  res.redirect(301, '/');
});

// Parse JSON request bodies
app.use(express.json());

// Prefix routes with '/api'
app.use('/api', mailchimpRoutes);

// Word of the Day route
app.get('/word-of-the-day', (req, res) => {
  res.send(getWordOfTheDayHtml());
});

// Route for "Thank You" page
app.get('/thankyou', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thankyou'));
});

// 404 Error Handling
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// General Error Handling
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Internal Server Error');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
