import { Router } from 'express'
import UserController from '../controllers/UserController'
import validateCredentials from '../middlewares/validateCredentials'

const userRouter = Router()

userRouter.post('/register', validateCredentials, UserController.register)

export default userRouter
