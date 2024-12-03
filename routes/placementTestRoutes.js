// routes/placementTestRoutes.js

const express = require("express");
const router = express.Router();
const placementTestController = require("../controllers/placementTestController");

router.get("/placement-test", (req, res) => res.render("placement-test/index"));
router.get("/placement-test/listening", (req, res) =>
  res.render("placement-test/listening")
);
router.get("/placement-test/use-of-english", (req, res) =>
  res.render("placement-test/use_of_english")
);

// Existing API route to fetch the next question
router.post("/api/get-question", placementTestController.getQuestion);

// New API route to fetch a question by quiz_category and id
router.post("/api/get-question-by-id", placementTestController.getQuestionById);

router.post("/api/save-test-results", placementTestController.saveTestResults);

module.exports = router;
