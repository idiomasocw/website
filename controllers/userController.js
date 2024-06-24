const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const cognito = new AWS.CognitoIdentityServiceProvider({
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
    req.session.message = "We have sent a One-Time Password to your email.";
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

    res.render('studentDashboard', { fullName });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.redirect('/login');
  }
};

const logout = (req, res) => {
  res.clearCookie('idToken');
  res.clearCookie('accessToken');
  res.redirect('/login');
};

module.exports = {
  sendLoginCode,
  verifyLoginCode,
  showDashboard,
  logout
};
