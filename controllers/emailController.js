const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_SES_SMTP_USER,
    pass: process.env.AWS_SES_SMTP_PASSWORD,
  },
});

async function sendEmail(recipientEmail, adminEmail, userName, results) {
  const mailOptions = {
    from: '"OneCulture World" <noreply@onecultureworld.com>',
    to: [recipientEmail],
    bcc: [adminEmail],
    subject: "Placement Test Results",
    html: results,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

module.exports = { sendEmail };
