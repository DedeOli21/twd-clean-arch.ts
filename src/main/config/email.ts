import { EmailOptions } from '@/usecases/send-email/ports'

const attachments = [{
  filename: 'text.txt',
  path: '../../resources/text.txt'
}]

export function getEmailOptions (): EmailOptions {
  const from = 'David Oliveira | David Oliveira <dedepco@gmail.com>'
  const to = ''
  const mailOptions: EmailOptions = {
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    from,
    to,
    subject: 'Teste de envio de email',
    text: 'Teste de envio de email',
    html: '<b>Teste de envio de email</b>',
    attachments
  }

  return mailOptions
}
