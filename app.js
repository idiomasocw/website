require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');
const app = express();
const moodleAPI = require('./controllers/moodleAPI');

// Configure the SMTP transporter
let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
      user: process.env.AWS_SES_SMTP_USER,
      pass: process.env.AWS_SES_SMTP_PASSWORD,
  },
});

// Function to send email
async function sendEmail(recipientEmail, adminEmail, userName, results) {
  const mailOptions = {
    from: '"OneCulture World" <noreply@onecultureworld.com>',
    to: [recipientEmail],
    bcc:[adminEmail],
    subject: "Placement Test Results",
    html: results,
  };

  try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
  } catch (error) {
      console.error("Error sending email: ", error);
  }
}

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

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

// New route for SMS webhook
app.post('/sms-webhook', (req, res) => {
  const { from, to, message } = req.body;
  console.log(`Received SMS from ${from} to ${to}: ${message}`);

  const params = {
    Message: `Received SMS from ${from} to ${to}: ${message}`,
    PhoneNumber: process.env.MY_CELLPHONE_NUMBER, // Use environment variable for your cellphone number
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    }
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.error('Error publishing to SNS:', err, err.stack);
      res.status(500).send('Error publishing to SNS');
    } else {
      console.log(`Message sent to phone: ${data}`);
      res.sendStatus(200); // Respond with 200 OK
    }
  });
});

// Existing routes for your website
app.get('/login', (req, res) => {
  res.render('login');
});

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

app.get('/', (req, res) => {
  res.render('index');
});

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

      await sendEmail(email, 'academico@onecultureworld.com', name, results);
      res.json({ message: "Email sent successfully!" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
  }
});

app.use('/api', mailchimpRoutes);

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
