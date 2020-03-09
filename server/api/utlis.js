const adminOnly = (req, res, next) => {
  if (req.user && req.user.type === 'admin') {
    next()
  } else {
    // console.log(‘this is an admin only request’)
    // console.log(req)
    res.sendStatus(404)
  }
}
const userOnly = (req, res, next) => {
  if (req.user && req.user.id === req.params.id) {
    next()
  } else {
    res.sendStatus(404)
  }
}

// guest userId is 0, guest should be able to pass this
const selfOnly = (req, res, next) => {
  if (req.params.id === req.user.id) {
    next()
  } else {
    res.sendStatus(404)
  }
}

const userRequire = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    res.sendStatus(404)
  }
}

const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL
)

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
})

async function sendEmail(emailBody) {
  let mailConfig
  if (process.env.NODE_ENV === 'production') {
    // this actually delivers the emails,
    // if (true) {  //
    const accessToken = oauth2Client.getAccessToken()
    mailConfig = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'aprilsunnew@gmail.com',
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken
      }
    }
  } else {
    // this does not actually delivers the emails, but in mailtrap it shows that email is delivered
    mailConfig = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USERNAME, //generated by Mailtrap
        pass: process.env.MAILTRAP_PASSWORD //generated by Mailtrap
      }
    }
  }

  const transporter = nodemailer.createTransport(mailConfig)

  // send mail with defined transport object
  let info = await transporter.sendMail(emailBody)

  console.log('Message sent: %s', info.messageId)
}

module.exports = {adminOnly, userOnly, sendEmail, selfOnly, userRequire}
// module.exports = {adminOnly, userOnly, userRequire, sendEmail}
