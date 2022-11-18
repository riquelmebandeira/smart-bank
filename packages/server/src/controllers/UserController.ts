import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'
import { generateJWT } from '../utils/generateJWT'

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body
      const newUser = await UserService.register(username, password)
      const token = generateJWT(newUser)
      return res.status(201).json(token)
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()