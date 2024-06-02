const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: '10.200.11.11',
  port: 25,
  secure: false,
  auth: {
    user: 'ticket@pana.com.co',
    pass: 'ticket123'
  }
})

// 10.200.11.11 host
// 25 port
// N Secure
// ticket@pana.com.co correo desde donde se hace la peticion
// ticket123 contraseña
// ticket@pana.com.co
// Pana Bussines SAS
// ;
// 0

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (to, subject, text, html) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'Pana Bussines SAS <ticket@pana.com.co>', // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html // html body
  })

  return info.messageId
}

module.exports = sendEmail
