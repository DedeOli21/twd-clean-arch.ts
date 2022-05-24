import { left } from '@/shared'
import { User } from '@/entities'
import { InvalidNameError } from '@/entities/errors'

describe('User domain entity', () => {
  test('Should not create user with invalid e-mail address', () => {
    const invalidEmail = 'invalid_email'
    const error = User.create({ name: 'any_name', email: invalidEmail }).value as Error
    expect(error.message).toEqual('Invalid email: ' + invalidEmail + '.')
  })

  test('should not create user with invalid name (too few characters)', () => {
    const invalidName = 'O             '
    const error = User.create({ name: invalidName, email: 'any_email@mail.com' }).value as Error
    expect(error.name).toEqual('InvalidNameError')
    expect(error.message).toEqual('Invalid name: ' + invalidName + '.')
  })

  test('should not create user with invalid name (too many characters)', () => {
    const invalidName = 'O'.repeat(257)
    const error = User.create({ name: invalidName, email: 'any_email@mail.com' })
    expect(error).toEqual(left(new InvalidNameError(invalidName)))
  })

  test('Should create user with valid data', () => {
    const validName = 'any_name'
    const validEmail = 'any@email.com'
    const user: User = User.create({ name: validName, email: validEmail }).value as User
    expect(user.name.value).toEqual(validName)
    expect(user.email.value).toEqual(validEmail)
  })
})
