import { left } from '../shared'
import { User } from './user'
import { InvalidEmailError } from './errors'

describe('User domain entity', () => {
  test('Should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError(invalidEmail)))
  })
})
