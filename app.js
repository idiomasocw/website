require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const app = express();

// Importing routes
const indexRoutes = require("./routes/index");
const placementTestRoutes = require("./routes/placementTestRoutes");
const priceDiscountManagerRoutes = require("./routes/priceDiscountManagerRoutes");
const userRoutes = require("./routes/userRoutes");

// Set up EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("trust proxy", 1);

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      httpOnly: true, // Prevent client-side JS from accessing cookies
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      domain: ".onecultureworld.com", // Accept subdomains
      sameSite: "strict", // Protect against CSRF
    },
  })
);

// Generate a nonce for inline scripts
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString("base64");
  next();
});

// Security enhancements with Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'sha256-bxJC7ESg7kXmCO9nlT3pVMLBcHOoaGC93bo9bxNLytk='", // Hash of inline script
          "'sha256-GMIo8LZugaFkVWyFuvqNP5lysS9n798Rx54/zmHb5rU='", // Additional inline script hash
          "'sha256-fg0DzA5/LflLAxY7Tb0VFBSEqZ/Tdg+hpbTjWC4QXWg='", // Another inline script hash
          "'sha256-yY00+MtQc0+o8GiaAnpQVj/ufqWO+gmKAhS4RWV1R/g='",
          "'sha256-OQOWj7ThayvltiopBoZEQmEo3YJkGyO/e7XWZ8zwCbI='",
          "https://kit.fontawesome.com", // Allow FontAwesome scripts
          (req, res) => `'nonce-${res.locals.nonce}'`, // Allow inline scripts with nonce
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'", // Allow inline styles (if necessary)
          "https://fonts.googleapis.com", // Google Fonts stylesheets
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com", // Google Fonts
          "https://ka-f.fontawesome.com", // FontAwesome fonts
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://ocw-program.s3.amazonaws.com",
          "https://d37w1mprrue3dh.cloudfront.net",
        ],
        mediaSrc: [
          "'self'",
          "https://d37w1mprrue3dh.cloudfront.net", // Allow media from CloudFront
          "https://ocw-program.s3.amazonaws.com",
        ],

        connectSrc: [
          "'self'",
          "https://ka-f.fontawesome.com", // Allow FontAwesome dynamic resources
        ],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        scriptSrcAttr: ["'self'", "'unsafe-inline'"],
      },
    },
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// Serve static files
app.use(express.static("public"));

// Middleware setup
app.use(cookieParser());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Use routes
app.use("/", indexRoutes);
app.use("/", placementTestRoutes);
app.use("/", priceDiscountManagerRoutes);
app.use("/", userRoutes); // Ensure user routes are prefixed correctly

// Error handling middleware
app.use((req, res, next) => {
  console.log("404 Error - Page not found: ", req.originalUrl);
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  console.error("General error:", error.stack);
  res.status(500).send("Internal Server Error");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
