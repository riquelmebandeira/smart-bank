import { NextFunction, Request, Response } from 'express'
import UserController from '../../src/controllers/UserController'
import UserService from '../../src/services/UserService'
import {
  InvalidCredentialsError,
  UserConflictError
} from '../../src/utils/errors'
import { mockRequest, mockResponse } from '../utils'
jest.mock('../../src/services/UserService')

const UserServiceMock = UserService as unknown as jest.Mocked<
  typeof UserService
>

describe('UserController', () => {
  let next: jest.Mock<NextFunction>
  let req: Request
  let res: Response

  beforeEach(() => {
    next = jest.fn()
    req = mockRequest() as Request
    res = mockResponse() as Response
  })

  it('should respond with status 201 and JWT when user is registered', async () => {
    UserServiceMock.register.mockImplementation(async () => ({
      id: 1,
      username: 'dummy'
    }))

    await UserController.register(req, res, next)

    expect(res.status).toBeCalledWith(201)
    expect(res.json).toBeDefined()
  })

  it('should call next with error when registering an existing user', async () => {
    UserServiceMock.register.mockImplementation(() => {
      throw UserConflictError
    })

    await UserController.register(req, res, next)

    expect(next).toBeCalledWith(UserConflictError)
  })

  it('should be able to login and respond with status 200 and JWT', async () => {
    UserServiceMock.login.mockImplementation(async () => ({
      id: 1,
      username: 'dummy'
    }))

    await UserController.login(req, res, next)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeDefined()
  })

  it('should call next with error when login invalid credentials', async () => {
    UserServiceMock.login.mockImplementation(() => {
      throw InvalidCredentialsError
    })

    await UserController.login(req, res, next)

    expect(next).toBeCalledWith(InvalidCredentialsError)
  })

  it('should be able to return user data', async () => {
    const mockUserData = {
      id: 1,
      username: 'dummy',
      account: {
        balance: 100
      }
    }

    UserServiceMock.getData.mockImplementation(async () => mockUserData)

    await UserController.getData(req, res, next)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith(mockUserData)
  })
})
