const express = require("express");
const csrf = require("csurf");
const router = express.Router();
const {
  sendLoginCode,
  verifyLoginCode,
  showDashboard,
  generatePresignedUrl,
  triggerLambdaFunction,
  logout,
} = require("../controllers/userController");
const {
  getPricingData,
  getPriceDiscountManager,
} = require("../controllers/pricingController");

// CSRF middleware initialization
const csrfProtection = csrf({
  cookie: {
    httpOnly: true,
    secure: true,
    domain: ".onecultureworld.com",
    sameSite: "strict",
  },
});

// Routes
router.get("/login", (req, res) => {
  const error = req.session.error;
  req.session.error = null; // Clear the error after displaying it
  res.render("login", { error });
});

router.post("/send-login-code", csrfProtection, sendLoginCode);

router.get("/send-login-code", csrfProtection, (req, res) => {
  req.body.email = req.query.email;
  sendLoginCode(req, res);
});

router.get("/verify-code", csrfProtection, (req, res) => {
  const message = req.session.message;
  const error = req.session.error;
  req.session.message = null; // Clear the message after displaying it
  req.session.error = null; // Clear the error after displaying it
  res.render("verify-code", {
    email: req.query.email,
    message,
    error,
    csrfToken: req.csrfToken(),
  });
});

router.post("/verify-login-code", csrfProtection, verifyLoginCode);

router.get("/studentDashboard", csrfProtection, showDashboard);

router.get("/generatePresignedUrl", csrfProtection, generatePresignedUrl); // Add the route for presigned URL generation

router.get("/priceManager", csrfProtection, getPriceDiscountManager); // Use existing controller function to fetch and render pricing data

router.post("/trigger-lambda", csrfProtection, triggerLambdaFunction); // Add the route for triggering the Lambda function

router.get("/logout", csrfProtection, logout);

module.exports = router;
