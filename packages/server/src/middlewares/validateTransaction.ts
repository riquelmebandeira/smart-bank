import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const transactionSchema = Joi.object({
  creditedUsername: Joi.string().required(),
  value: Joi.number().greater(1).required()
})

const validateTransaction = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<string> | void => {
  const { username: debitedUsername } = req.currentUser
  const { creditedUsername } = req.body

  if (creditedUsername.toLowerCase() === debitedUsername.toLowerCase()) {
    return res
      .status(403)
      .json({ message: 'A transaction can only be made to a valid user.' })
  }

  const { error } = transactionSchema.validate(req.body)

  if (error) return res.status(400).json({ error: error.message })

  next()
}

export default validateTransaction
