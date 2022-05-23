import { UserData } from './user-data'
import { Either, left } from '../shared'
import { InvalidEmailError } from './errors'
import { Email } from './email'

export class User {
  static create (UserData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(UserData.email)
    if (emailOrError.isLeft()) return left(new InvalidEmailError(UserData.email))
  }
}
