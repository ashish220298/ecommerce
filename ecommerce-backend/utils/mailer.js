const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'as4446013@gmail.com',      // replace with your email
    pass: 'bele ybye ehfs rcev',          // use app password if 2FA is enabled
  },
});
//career@fullstacktechnologyy.com

exports.sendMail = async (to, subject, text) => {
    console.log('email sending in process')
  const mailOptions = {
    from: 'as4446013@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
  }
};
