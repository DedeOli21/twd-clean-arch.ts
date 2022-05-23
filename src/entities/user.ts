import { UserData } from './user-data'
import { Either, left } from '../shared'
import { InvalidEmailError, InvalidNameError } from './errors'
import { Email } from './email'
import { Name } from './name'

export class User {
  static create (userData: UserData): Either<InvalidEmailError | InvalidNameError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) return left(new InvalidNameError(userData.name))
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) return left(new InvalidEmailError(userData.email))
  }
}
