const { transporter } = require('../libs/nodemailer');

async function sendMail({
  from, emailFrom, emailTo, subject, body,
}) {
  await transporter.sendMail({
    from: `${from} ${emailFrom}`,
    to: emailTo,
    subject,
    html: body,
  });
}

module.exports = {
  sendMail,
};
