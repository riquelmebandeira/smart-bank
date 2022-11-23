import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const DATE_REGEX = new RegExp(/^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}$/)

const queryParamsSchema = Joi.object({
  category: Joi.string().valid('debited', 'credited'),
  date: Joi.string().pattern(DATE_REGEX)
})

const validateQueryParams = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<string> | void => {
  const { error } = queryParamsSchema.validate(req.query)

  if (error) return res.status(400).json({ error: error.message })

  next()
}

export default validateQueryParams
