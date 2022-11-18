import { NextFunction, Request, Response } from 'express'
import UserController from '../../src/controllers/UserController'
import UserService from '../../src/services/UserService'
import { UserConflictError } from '../../src/utils/errors'
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
})