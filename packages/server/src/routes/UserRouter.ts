import { Router } from 'express'
import UserController from '../controllers/UserController'
import validateCredentials from '../middlewares/validateCredentials'

const userRouter = Router()

userRouter.post('/user', validateCredentials, UserController.register)

export default userRouter
