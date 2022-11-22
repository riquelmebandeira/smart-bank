import { NextFunction, Request, Response } from 'express'
import TransactionService from '../services/TransactionService'
import UserService from '../services/UserService'
import { filterTransactionsByDate } from '../utils/filterTransactionsByDate'
import { serializeTransactions } from '../utils/serializeTransactions'

class TransactionController {
  async makeTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, creditedUsername } = req.body
      const { username: debitedUsername } = req.currentUser

      const debitedUser = await UserService.getData(debitedUsername)
      const creditedUser = await UserService.getData(creditedUsername)

      if (!creditedUser) {
        return res
          .status(404)
          .json({ error: 'The user to be credited does not exist.' })
      }

      const transaction = await TransactionService.makeTransaction(
        debitedUser!,
        creditedUser,
        value
      )

      return res.status(201).json(transaction)
    } catch (err) {
      next(err)
    }
  }

  async getTransactions(req: Request, res: Response, next: NextFunction) {
    try {
      const { accountId, username } = req.currentUser
      const { category, date } = req.query

      let transactions = await TransactionService.getTransactions(
        accountId,
        category as string
      )

      if (date) {
        transactions = filterTransactionsByDate(date as string, transactions)
      }

      const serialized = serializeTransactions(transactions, username)

      return res.status(200).json(serialized)
    } catch (err) {
      next(err)
    }
  }
}

export default new TransactionController()
