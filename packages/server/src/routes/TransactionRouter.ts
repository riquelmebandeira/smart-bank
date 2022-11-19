import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'
import validateJWT from '../middlewares/validateJWT'
import validateTransaction from '../middlewares/validateTransaction'

const transactionRouter = Router()

transactionRouter.post(
  '/transaction',
  validateJWT,
  validateTransaction,
  TransactionController.makeTransaction
)

export default transactionRouter
