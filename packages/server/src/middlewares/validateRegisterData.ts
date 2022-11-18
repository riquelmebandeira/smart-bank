import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const PASSWORD_REGEX = new RegExp(
  /(?=[A-Za-z0-9]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/
)

const registerDataSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().pattern(PASSWORD_REGEX).required()
})

const validateRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<string> | void => {
  const { error } = registerDataSchema.validate(req.body)

  if (error) return res.status(400).json({ error: error.message })

  next()
}

export default validateRegisterData
