require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();
const moodleAPI = require('./controllers/moodleAPI'); // Ensure this module is set up
const nodemailer = require('nodemailer');

// Configure the SMTP transporter
let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com", // or your specific AWS SES SMTP endpoint
  port: 587, // Standard port for SMTP
  secure: false, // true for 465, false for other ports
  auth: {
      user: process.env.AWS_SES_SMTP_USER, // Your SMTP user here
      pass: process.env.AWS_SES_SMTP_PASSWORD, // Your SMTP password here
  },
});

// Function to send email
async function sendEmail(recipientEmail, adminEmail, userName, results) {
  const mailOptions = {
      from: 'noreply@onecultureworld.com', // Verify this email in SES
      to: [recipientEmail],
      bcc:[adminEmail], // Array of recipients
      subject: "Placement Test Results",
      html: results, // This will be the HTML formatted string

  };

  try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  } catch (error) {
      console.error("Error sending email: ", error);
  }
}

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);

// Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

// Additional modules for security and rate limiting
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mailchimpRoutes = require('./routes/mailchimpRoutes');
const getWordOfTheDay = require('./wordOfTheDay');

// Security enhancements with Helmet
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

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Login Route
app.get('/login', (req, res) => {
  res.render('login');
});

// Handle Login Post Request
// Handle Login Post Request
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await moodleAPI.getUserToken(username, password);
    if (token && (username === 'admin' || username === 'diego')) {
      req.session.isAdmin = true;
      res.redirect('/priceDiscountManager');
    } else {
      res.render('login', { error: "Invalid credentials or not an admin." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.render('login', { error: "Credenciales inválidas. Ingresa credenciales de administrador para poder iniciar sesión." });
  }
});


// Routes for EJS templates
app.get('/', (req, res) => {
  res.render('index');
});
//New API endpoint to send pricing data
app.get('/api/pricing', (req, res) => {
  fs.readFile(path.join(__dirname, 'pricing.json'), 'utf8', (err, data) => {
      if (err) {
          console.error("Error reading pricing.json:", err);
          return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(JSON.parse(data));
  });
});

app.get('/cursos', (req, res) => {
  try {
    const pricingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'pricing.json'), 'utf-8'));

    // Determine the correct price based on user selection
    let userPriceInfo;
    if (req.session.mode === "private") {
      const lessonsKey = req.session.selectedDays + '_lessons';
      userPriceInfo = pricingData.privateLessons[lessonsKey];
    } else if (req.session.mode === "semi-private") {
      const lessonsKey = req.session.selectedIntensity + '_lessons';
      userPriceInfo = pricingData.semiPrivateLessons[lessonsKey];
    }

    res.render('cursos', { pricing: pricingData, userPriceInfo });
  } catch (error) {
    console.error("Error reading pricing.json for cursos page:", error);
    res.status(500).send("Error loading cursos page");
  }
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
  const wordData = getWordOfTheDay(); 
  res.render('wordOfTheDay', { word: wordData });
});

// Pricing manager route with session check
app.get('/priceDiscountManager', (req, res) => {
  if (req.session.isAdmin) {
    fs.readFile(path.join(__dirname, 'pricing.json'), 'utf8', (err, data) => {
      if (err) {
        console.error("Error reading pricing file for priceDiscountManager page:", err);
        return res.status(500).send("Error loading pricing information");
      }
      const pricing = JSON.parse(data);
      res.render('priceManager', { pricing });
    });
  } else {
    res.redirect('/login');
  }
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

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if(err) {
          console.error("Error in logging out:", err);
          return res.status(500).send('Error during logout');
      }
      res.redirect('/login');
  });
});

app.get('/placement-test', (req, res) => {
  res.render('placement-test/index');  // Adjust path according to your directory structure
});

app.get('/placement-test/listening', (req, res) => {
  res.render('placement-test/listening');
});

app.get('/placement-test/use-of-english', (req, res) => {
  res.render('placement-test/use_of_english');
});

app.post('/send-email', async (req, res) => {
  try {
      const { email, name, results } = req.body;

      await sendEmail(email, 'onecultureworld@gmail.com', name, results);
      res.json({ message: "Email sent successfully!" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
  }
});


// Prefix routes with '/api'
app.use('/api', mailchimpRoutes);

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
