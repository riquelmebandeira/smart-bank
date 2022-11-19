import { NextFunction, Request, Response } from 'express'
import TransactionService from '../services/TransactionService'

class TransactionController {
  async makeTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const { value, creditedUsername } = req.body
      const { username: debitedUsername } = req.currentUser

      const transaction = await TransactionService.makeTransaction(
        debitedUsername,
        creditedUsername,
        value
      )

      return res.status(201).json(transaction)
    } catch (err) {
      next(err)
    }
  }
}

export default new TransactionController()
