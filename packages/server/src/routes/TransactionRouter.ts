import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'
import validateJWT from '../middlewares/validateJWT'
import validateQueryParams from '../middlewares/validateQueryParams'
import validateTransaction from '../middlewares/validateTransaction'

const router = Router()

router.post(
  '/transaction',
  validateJWT,
  validateTransaction,
  TransactionController.makeTransaction
)

router.get(
  '/transaction',
  validateQueryParams,
  validateJWT,
  TransactionController.getTransactions
)

export default router
