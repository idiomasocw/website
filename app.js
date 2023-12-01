const express = require('express');
const app = express();
require('dotenv').config();
const mailchimpRoutes = require('./routes/mailchimpRoutes');
const getWordOfTheDayHtml = require('./wordOfTheDay');

// Redirect middleware
app.use((req, res, next) => {
  if (req.path === '/wordOfTheDay.html') {
    res.redirect(301, '/word-of-the-day');
  } else {
    next();
  }
});

// Serve static files
app.use(express.static('public'));
app.use(express.json()); // To parse JSON request bodies
app.use('/api', mailchimpRoutes); // Prefixing the routes with '/api'

// Word of the Day route
app.get('/word-of-the-day', (req, res) => {
  res.send(getWordOfTheDayHtml());
});
// Additional routes and server setup.

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
