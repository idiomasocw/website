const AWS = require("aws-sdk");
const nodemailer = require("nodemailer");

AWS.config.update({ region: "us-east-1" });
const sns = new AWS.SNS();

const fallbackEmail = process.env.MY_PERSONAL_EMAIL;

// Configure the email transporter for AWS SES
const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_SMTP_USER,
    pass: process.env.AWS_SES_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

async function send2FAEmail(recipientEmail, adminEmail, subject, body) {
  const mailOptions = {
    from: '"2FA Notification" <noreply@onecultureworld.com>',
    to: [recipientEmail],
    bcc: [adminEmail],
    subject: subject,
    html: body,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

async function smsWebhook(req, res) {
  const { from, to, message } = req.body;

  const smsParams = {
    Message: `Received SMS from ${from} to ${to}: ${message}`,
    PhoneNumber: process.env.MY_CELLPHONE_NUMBER,
    MessageAttributes: {
      "AWS.SNS.SMS.SMSType": {
        DataType: "String",
        StringValue: "Transactional",
      },
    },
  };

  // Prepare email content
  const emailSubject = "Notification 2FA";
  const emailBody = `
    <p><strong>Notification Details:</strong></p>
    <ul>
      <li><strong>From:</strong> ${from}</li>
      <li><strong>To:</strong> ${to}</li>
      <li><strong>Message:</strong> ${message}</li>
    </ul>
  `;

  // Send the email before attempting SMS
  await send2FAEmail(
    fallbackEmail,
    process.env.ADMIN_EMAIL,
    emailSubject,
    emailBody
  );

  // Attempt to send SMS
  sns.publish(smsParams, (err, data) => {
    if (err) {
      console.error("Error publishing to SNS:", err, err.stack);
      res.status(500).send("Error publishing to SNS");
    } else {
      console.log(
        `Message sent to phone ${smsParams.PhoneNumber}: MessageId ${data.MessageId}`
      );
      res.sendStatus(200);
    }
  });
}

module.exports = { smsWebhook };
