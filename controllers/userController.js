const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const cognito = new AWS.CognitoIdentityServiceProvider({
  region: process.env.AWS_REGION
});

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3({
  region: process.env.AWS_REGION
});

const sendLoginCode = async (req, res) => {
  const email = req.body.email;

  const params = {
    AuthFlow: 'CUSTOM_AUTH',
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email
    }
  };

  try {
    const authResponse = await cognito.initiateAuth(params).promise();
    req.session.challengeName = authResponse.ChallengeName;
    req.session.session = authResponse.Session;
    req.session.email = email;
    req.session.message = "We have sent a One-Time Password to your email. Check your email 'spam' or 'junk' folder if necessary.";
    res.redirect(`/verify-code?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error('Error sending login code:', error);
    req.session.error = "The email that you entered has no access privileges.";
    res.redirect('/login');
  }
};

const verifyLoginCode = async (req, res) => {
  const email = req.session.email;
  const code = req.body.code;

  const params = {
    ChallengeName: req.session.challengeName,
    ClientId: process.env.COGNITO_CLIENT_ID,
    ChallengeResponses: {
      USERNAME: email,
      ANSWER: code
    },
    Session: req.session.session
  };

  try {
    const data = await cognito.respondToAuthChallenge(params).promise();
    if (data.AuthenticationResult && data.AuthenticationResult.IdToken && data.AuthenticationResult.AccessToken) {
      const accessToken = data.AuthenticationResult.AccessToken;

      // Fetch user groups
      const userGroupsParams = {
        AccessToken: accessToken
      };
      const userData = await cognito.getUser(userGroupsParams).promise();
      const groupsParams = {
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username: userData.Username
      };
      const userGroups = await cognito.adminListGroupsForUser(groupsParams).promise();

      // Determine role based on group membership
      const userRole = userGroups.Groups.length > 0 ? userGroups.Groups[0].GroupName : 'students'; // Default to 'students' if no group

      req.session.role = userRole;  // Store role in session

      // Log the stored email and role for verification
      console.log(`verifyLoginCode - Email stored in session: ${req.session.email}`);
      console.log(`verifyLoginCode - Role stored in session: ${req.session.role}`);

      // Check group membership and redirect accordingly
      const isAdmin = userGroups.Groups.some(group => group.GroupName === 'admins');
      if (isAdmin) {
        res.cookie('idToken', data.AuthenticationResult.IdToken, { httpOnly: true });
        res.cookie('accessToken', accessToken, { httpOnly: true });
        return res.redirect('/priceManager');
      } else {
        res.cookie('idToken', data.AuthenticationResult.IdToken, { httpOnly: true });
        res.cookie('accessToken', accessToken, { httpOnly: true });
        return res.redirect('/studentDashboard');
      }
    } else {
      console.error('Authentication result does not contain tokens', data);
      req.session.error = "Failed to verify the code. Please try again.";
      res.redirect(`/verify-code?email=${encodeURIComponent(email)}`);
    }
  } catch (error) {
    console.error('Error verifying login code:', error);
    req.session.error = "Failed to verify the code. Please try again.";
    res.redirect(`/verify-code?email=${encodeURIComponent(email)}`);
  }
};

const fetchUserData = async (email, role) => {
  console.log(`fetchUserData - Fetching user data for email: ${email}, role: ${role}`);
  const params = {
    TableName: 'users',
    Key: {
      email: email,
      role: role
    }
  };

  try {
    const data = await dynamoDb.get(params).promise();
    console.log('fetchUserData - DynamoDB get response:', data);
    if (data.Item) {
      console.log(`User data for ${email}:`, data.Item);
      return data.Item;
    } else {
      console.log(`No user found for email: ${email}`);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data from DynamoDB:', error);
    return null;
  }
};

const showDashboard = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.redirect('/login');
  }

  try {
    const params = {
      AccessToken: accessToken
    };

    const userData = await cognito.getUser(params).promise();
    const givenName = userData.UserAttributes.find(attr => attr.Name === 'given_name').Value;
    const familyName = userData.UserAttributes.find(attr => attr.Name === 'family_name').Value;
    const fullName = `${givenName} ${familyName}`;

    const email = req.session.email;
    const role = req.session.role;

    const userDetails = await fetchUserData(email, role);

    res.render('studentDashboard', { fullName, userDetails });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.redirect('/login');
  }
};

const generatePresignedUrl = async (req, res) => {
  const { key } = req.query;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Ensure this is set in your .env
    Key: key,
    Expires: 5 * 60 // URL expiry time in seconds (5 minutes)
  };

  try {
    const url = s3.getSignedUrl('getObject', params);
    res.json({ url });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    res.status(500).json({ error: 'Error generating presigned URL' });
  }
};

const logout = (req, res) => {
  res.clearCookie('idToken');
  res.clearCookie('accessToken');
  res.redirect('/');
};

module.exports = {
  sendLoginCode,
  verifyLoginCode,
  showDashboard,
  generatePresignedUrl,
  logout
};
