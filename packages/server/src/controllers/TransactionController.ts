import { NextFunction, Request, Response } from 'express'
import prisma from '../database/prismaClient'
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
      const { accountId } = req.currentUser
      const { category, date } = req.query

      const transactions = await TransactionService.getTransactions(
        accountId,
        category as string
      )

      const serialized = serializeTransactions(transactions!)

      if (date) {
        const filtered = filterTransactionsByDate(date as string, serialized)
        return res.status(200).json(filtered)
      }

      return res.status(200).json(serialized)
    } catch (err) {
      next(err)
    }
  }
}

export default new TransactionController()
