import { Router } from 'express'
import UserController from '../controllers/UserController'
import validateCredentials from '../middlewares/validateCredentials'
import validateJWT from '../middlewares/validateJWT'

const userRouter = Router()

userRouter.post('/register', validateCredentials, UserController.register)
userRouter.post('/login', validateCredentials, UserController.login)
userRouter.get('/user', validateJWT, UserController.getData)

export default userRouter
