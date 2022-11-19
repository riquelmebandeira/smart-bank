import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import prisma from '../database/prismaClient'
dotenv.config()

const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Token not found.' })
  }

  try {
    const secret = process.env.JWT_SECRET as string

    const { username } = jwt.verify(token, secret) as JwtPayload

    const user = await prisma.user.findUnique({ where: { username } })

    if (!user) return res.status(404).json({ message: 'User not found' })

    req.currentUser = user

    next()
  } catch (err) {
    return res.status(401).json({ message: 'The token is invalid.' })
  }
}

export default validateJWT
