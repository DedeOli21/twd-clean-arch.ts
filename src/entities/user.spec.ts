import { left } from '../shared'
import { User } from './user'
import { InvalidEmailError, InvalidNameError } from './errors'

describe('User domain entity', () => {
  test('Should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail })
    expect(error).toEqual(left(new InvalidEmailError(invalidEmail)))
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O             '
    const error = User.create({ name: invalidName, email: 'any_email@mail.com' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any_email@mail.com' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })
})
