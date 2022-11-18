import { Router } from 'express'
import UserController from '../controllers/UserController'
import validateRegisterData from '../middlewares/validateRegisterData'

const userRouter = Router()

userRouter.post('/user', validateRegisterData, UserController.register)

export default userRouter
