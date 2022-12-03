const nodemailer = require('nodemailer');
const config = require('../../config/env');

const transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: true,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
});

/**
 * test transporter connection
 */
transporter.verify().then(() => {
  console.log('Ready for send emails...');
});

module.exports = {
  transporter,
};
