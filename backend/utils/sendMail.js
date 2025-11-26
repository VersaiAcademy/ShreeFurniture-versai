const nodemailer = require('nodemailer');

let transporter;

const bootstrapTransporter = () => {
  if (transporter) return transporter;

  if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
    throw new Error('Missing MAIL_USER/MAIL_PASS in environment');
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  return transporter;
};

const sendMail = async ({ to, subject, html, text }) => {
  if (!to) throw new Error('No recipient provided');
  if (!subject) throw new Error('No subject provided');
  if (!html && !text) throw new Error('No email body provided');

  const mailer = bootstrapTransporter();

  await mailer.sendMail({
    from: `"SRI Furniture Village" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
    text
  });
};

module.exports = sendMail;
