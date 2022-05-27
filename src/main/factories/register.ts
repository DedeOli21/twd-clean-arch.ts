import { RegisterAndSendEmailController } from '@/web-controllers/'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
// // import { SendEmail } from '@/usecases/send-email'
// // import { NodemailerEmailService } from '@/external/mail-services'
// // import { getEmailOptions } from '@/main/config/email'
// // import { RegisterAndSendEmail } from '@/usecases/register-and-send-email'

export const makeRegisterAndSendEmailController = (): RegisterAndSendEmailController => {
  const mongoDbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongoDbUserRepository)
  const registerUserController = new RegisterAndSendEmailController(registerUserOnMailingListUseCase)
  return registerUserController
  // const registerAndSendEmailUseCase = new RegisterAndSendEmail(registerUserOnMailingListUseCase)
  //   // // const emailService = new NodemailerEmailService()
  //   // // const sendEmailUseCase = new SendEmail(getEmailOptions(), emailService)
  // }
}
