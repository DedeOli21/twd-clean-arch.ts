import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UseCase } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterAndSendEmailController } from '@/web-controllers/register-user-controller'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('Register user web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(usecase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }
  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('Should return status code 200 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(request.body)
  })

  test('Should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidName)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('Should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidEmail: HttpRequest = {
      body: {
        name: 'valid name',
        email: 'invalid_mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidEmail)
    expect(response.statusCode).toBe(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('Should return status code 400 when request is missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'any@mail.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingName)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('Should return status code 400 when request is missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'valid name'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('Should return status code 400 when request is missing user email', async () => {
    const requestWithMissingNameAndEmail: HttpRequest = {
      body: { }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingNameAndEmail)
    expect(response.statusCode).toBe(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })

  test('Should return status code 500 when server raises', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@mail.com'
      }
    }
    const controller: RegisterAndSendEmailController = new RegisterAndSendEmailController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toBe(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
