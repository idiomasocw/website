const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const sns = new AWS.SNS();

function smsWebhook(req, res) {
  const { from, to, message } = req.body;
  console.log(`Received SMS from ${from} to ${to}: ${message}`);

  const params = {
    Message: `Received SMS from ${from} to ${to}: ${message}`,
    PhoneNumber: process.env.MY_CELLPHONE_NUMBER,
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
      res.sendStatus(200);
    }
  });
}

module.exports = { smsWebhook };
