const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (to, subject, text, html) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Pana Bussines SAS <${process.env.SMTP_USER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html // html body
  })

  return info.messageId
}

module.exports = sendEmail
