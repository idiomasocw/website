require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// Importing routes
const indexRoutes = require('./routes/index');
const placementTestRoutes = require('./routes/placementTestRoutes');
const priceDiscountManagerRoutes = require('./routes/priceDiscountManagerRoutes');
const userRoutes = require('./routes/userRoutes');

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Security enhancements with Helmet
app.use(helmet({ contentSecurityPolicy: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Serve static files
app.use(express.static('public'));

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Use routes
app.use('/', indexRoutes);
app.use('/', placementTestRoutes);
app.use('/', priceDiscountManagerRoutes);
app.use('/', userRoutes); // Ensure user routes are prefixed correctly

// Error handling middleware
app.use((req, res, next) => {
  console.log("404 Error - Page not found: ", req.originalUrl);
  res.status(404).render('404');
});

app.use((error, req, res, next) => {
  console.error("General error:", error.stack);
  res.status(500).send('Internal Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
