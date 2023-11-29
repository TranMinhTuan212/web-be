import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { config } from 'dotenv'
import { Tracing } from 'trace_events'
import fs from 'fs'
import path from 'path'
config()
// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})
const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/verify_email.html'), 'utf-8')
const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}: {
  fromAddress: string
  toAddresses: string | string[]
  ccAddresses?: string | string[]
  body: string
  subject: string
  replyToAddresses?: string | string[]
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

const sendVerifyEmail = (toAddress: string, subject: string, body: string) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS as string,
    toAddresses: toAddress,
    body,
    subject
  })
  return sesClient.send(sendEmailCommand)
}

export const sendVerifyEmailRegister = (
  toAddress: string,
  email_Verify_token: string,
  templates: string = verifyEmailTemplate
) => {
  return sendVerifyEmail(
    toAddress,
    'verify your email',
    templates
      .replace('{{title}}', 'Mã xác nhận tài khoản web2')
      .replace('{{content}}', 'Click vào bên dưới để xác nhận email')
      .replace('{{token}}', `${email_Verify_token}`)
      .replace('{{link}}', `${process.env.CLINENT_URL}/verify_email?token=${email_Verify_token}`)
  )
}

export const sendForgotPasswordEmail = (
  toAddress: string,
  forgot_password_token: string,
  templates: string = verifyEmailTemplate
) => {
  return sendVerifyEmail(
    toAddress,
    'Reset Password',
    templates
      .replace('{{title}}', 'Password reset')
      .replace('{{content}}', 'Click vào bên dưới để xác nhận mật khẩu')
      .replace('{{token}}', `${forgot_password_token}`)
      .replace('{{link}}', `${process.env.CLINENT_URL}/reset-password?token=${forgot_password_token}`)
  )
}
// sendVerifyEmail('ngocphongdnp@gmail.com', 'Tiêu đề email', '<h1>Nội dung email</h1>')
