// services/dynamoDBService.js

// Import the required AWS SDK v3 modules
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand, // Import GetCommand for getQuestionById
  PutCommand, // Import PutCommand for saving test results
} = require("@aws-sdk/lib-dynamodb");

// Initialize DynamoDB Client
const dynamoDbClient = new DynamoDBClient({ region: "us-east-1" });

// Create the DynamoDB Document Client
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

// Replace with your actual table name and index name
const TABLE_NAME = "PlacementTestQuestions";
const INDEX_NAME = "quiz_category-level-index";
const TEST_RESULTS_TABLE = "test-results";

exports.getNextQuestion = async (quiz_category, level, answeredQuestionIds) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      IndexName: INDEX_NAME,
      KeyConditionExpression:
        "#quiz_category = :quiz_category AND #level = :level",
      ExpressionAttributeNames: {
        "#quiz_category": "quiz_category",
        "#level": "level",
      },
      ExpressionAttributeValues: {
        ":quiz_category": quiz_category,
        ":level": parseInt(level),
      },
    };

    // Create a new QueryCommand with the parameters
    const command = new QueryCommand(params);

    // Send the query command to DynamoDB
    const result = await dynamoDb.send(command);

    // Filter out answered questions
    const unansweredQuestions = result.Items.filter(
      (item) => !answeredQuestionIds.includes(item.id.toString())
    );

    if (unansweredQuestions.length > 0) {
      // Randomly select one question
      const randomIndex = Math.floor(
        Math.random() * unansweredQuestions.length
      );
      return unansweredQuestions[randomIndex];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching question from DynamoDB:", error);
    throw error;
  }
};

// New function to get a question by quiz_category and id
exports.getQuestionById = async (quiz_category, id) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        quiz_category: quiz_category,
        id: parseInt(id),
      },
    };

    // Create a new GetCommand with the parameters
    const command = new GetCommand(params);

    // Send the get command to DynamoDB
    const result = await dynamoDb.send(command);

    if (result.Item) {
      return result.Item;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching question from DynamoDB:", error);
    throw error;
  }
};

// New function to save test results
exports.saveTestResults = async (testResults) => {
  try {
    const params = {
      TableName: TEST_RESULTS_TABLE,
      Item: testResults,
    };

    // Create a new PutCommand with the parameters
    const command = new PutCommand(params);

    // Send the put command to DynamoDB
    await dynamoDb.send(command);
  } catch (error) {
    console.error("Error saving test results to DynamoDB:", error);
    throw error;
  }
};
