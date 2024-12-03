// controllers/placementTestController.js

const dynamoDBService = require("../services/dynamoDBService");

exports.getQuestion = async (req, res) => {
  try {
    const { quiz_category, currentLevel, answeredQuestionIds } = req.body;

    // Fetch a question from DynamoDB
    const question = await dynamoDBService.getNextQuestion(
      quiz_category,
      currentLevel,
      answeredQuestionIds
    );

    if (question) {
      res.json({ question });
    } else {
      res.status(404).json({ message: "No more questions available" });
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
};

// New function to handle getQuestionById
exports.getQuestionById = async (req, res) => {
  try {
    const { quiz_category, id } = req.body;

    // Fetch the question from DynamoDB
    const question = await dynamoDBService.getQuestionById(quiz_category, id);

    if (question) {
      res.json({ question });
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the question" });
  }
};

// New function to handle saving test results
exports.saveTestResults = async (req, res) => {
  try {
    const testResults = req.body;

    // Validate the testResults data as needed
    if (!testResults.email || !testResults.full_name) {
      return res
        .status(400)
        .json({ error: "Missing required user information" });
    }

    // Save the test results to DynamoDB
    await dynamoDBService.saveTestResults(testResults);

    res.status(200).json({ message: "Test results saved successfully" });
  } catch (error) {
    console.error("Error saving test results:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the test results" });
  }
};
