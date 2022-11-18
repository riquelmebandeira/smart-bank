import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { prismaMock } from '../../src/database/singleton'
import UserService from '../../src/services/UserService'
import {
  InvalidCredentialsError,
  UserConflictError
} from '../../src/utils/errors'

describe('UserService', () => {
  it('should be able to create a new user', async () => {
    const mockData = {
      id: 1,
      username: 'dummy'
    }

    prismaMock.user.create.mockResolvedValue(mockData as User)

    const user = await UserService.register('username', 'password')

    expect(user).toHaveProperty('id')
    expect(user.username).toBe('dummy')
    expect(user).not.toHaveProperty('password')
  })

  it('should not be able to create an existing user', async () => {
    prismaMock.user.create.mockRejectedValue(
      new PrismaClientKnownRequestError('', 'P2002', '')
    )

    await expect(UserService.register('username', 'password')).rejects.toThrow(
      UserConflictError
    )
  })

  it('should be able to login a user', async () => {
    const mockUser = {
      id: 1,
      username: 'john',
      password: '9fc481f2938fcae0501f47af9e7fdabb'
    } as User

    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const user = await UserService.login('john', 'D7ee68fd')

    expect(user).toHaveProperty('id')
    expect(user.username).toBe('john')
    expect(user).not.toHaveProperty('password')
    expect(user).not.toHaveProperty('accountId')
  })

  it('should throw an error when login with invalid password', async () => {
    const mockUser = {
      id: 1,
      username: 'john',
      password: '9fc481f2938fcae0501f47af9e7fdabb'
    } as User

    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    await expect(UserService.login('john', 'admin')).rejects.toThrow(
      InvalidCredentialsError
    )
  })

  it('should throw an error when login with invalid username', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    await expect(UserService.login('john', 'admin')).rejects.toThrow(
      InvalidCredentialsError
    )
  })
})
