const express = require('express');
const app = express();
require('dotenv').config();
const mailchimpRoutes = require('./routes/mailchimpRoutes');

app.use(express.static('public'));
app.use(express.json()); // To parse JSON request bodies
app.use('/api', mailchimpRoutes); // Prefixing the routes with '/api'

// Additional routes and server setup...

const PORT = process.env.PORT || 3000;
app.listen(3000, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
