import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { prismaMock } from '../../src/database/singleton'
import UserService from '../../src/services/UserService'
import { UserConflictError } from '../../src/utils/errors'

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
})
