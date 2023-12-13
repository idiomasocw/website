const fetch = require('node-fetch'); // Ensure node-fetch is installed

const MOODLE_URL = process.env.MOODLE_URL;  // Base URL of your Moodle installation
const MOODLE_SERVICE = 'moodle_mobile_app'; // Default service for mobile app


/**
 * Fetch user token from Moodle
 * @param {string} username - Moodle username
 * @param {string} password - Moodle password
 * @returns {Promise<string>} - A promise that resolves to the user token
 */
const getUserToken = async (username, password) => {
  const response = await fetch(`${MOODLE_URL}/login/token.php`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&service=${MOODLE_SERVICE}`
  });

  const data = await response.json();
  if (data && data.token) {
      return data.token;
  } else {
      throw new Error(data.error || "Failed to authenticate user");
  }
};

module.exports = { getUserToken };


