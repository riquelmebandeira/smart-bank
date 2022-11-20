import { NextFunction, Request, Response } from 'express'
import UserService from '../services/UserService'
import { generateJWT } from '../utils/generateJWT'
import { serializeUserData } from '../utils/serializeUserData'

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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body
      const user = await UserService.login(username, password)
      const token = generateJWT(user)
      return res.status(200).json(token)
    } catch (err) {
      next(err)
    }
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.currentUser
      const data = await UserService.getData(username)
      const serialized = serializeUserData(data!)
      return res.status(200).json(serialized)
    } catch (err) {
      next(err)
    }
  }
}

export default new UserController()
