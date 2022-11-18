import prisma from '../database/prismaClient'
import md5 from 'md5'
import { InvalidCredentialsError, UserConflictError } from '../utils/errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

class UserService {
  public async register(username: string, password: string) {
    try {
      const hashedPassword = md5(password)

      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
          account: {
            create: {
              balance: 100.0
            }
          }
        },
        select: {
          id: true,
          username: true
        }
      })

      return newUser
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') throw UserConflictError
      }
      throw err
    }
  }

  async login(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) throw InvalidCredentialsError

    const hashedPassword = md5(password)

    if (user.password !== hashedPassword) throw InvalidCredentialsError

    const { password: _password, accountId: _accountId, ...userInfo } = user

    return userInfo
  }
}

export default new UserService()
