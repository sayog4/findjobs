import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
dotenv.config()

sgMail.setApiKey(process.env.SG_API_KEY as string)

async function signUpLinkEmail(token: string, email: string) {
  const emailData = {
    from: process.env.EMAIL_FROM as string,
    to: email,
    subject: `Account activation link`,
    text: 'Keep this email safe',
    html: `
      <p>Please use following link to activate your account:</p>
      <a style={{
        display: 'inlineBlock',
        padding: '10px 20px,
        border: '1px solid #333',
      }} href='${process.env.CLIENT_URL}/auth/account/activate/${token}'>Click hree to activate your account</a>
      <hr />
      <p>This email may contain sensitive information</p>
    `,
  }
  try {
    const response = await sgMail.send(emailData)
    console.log(response[0].statusCode)
    return
  } catch (error: any) {
    console.error(error)
    if (error.response) {
      console.log(error.response.body)
    }
  }
}

export { signUpLinkEmail }
