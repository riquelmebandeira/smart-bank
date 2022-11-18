import prisma from '../database/prismaClient'
import md5 from 'md5'
import { UserConflictError } from '../utils/errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'

class UserService {
  public async register(
    username: string,
    password: string
  ): Promise<any | typeof UserConflictError> {
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
}

export default new UserService()
