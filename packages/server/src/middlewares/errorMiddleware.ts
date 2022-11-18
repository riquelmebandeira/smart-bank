import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import CustomError from '../utils/errors'

const errorMiddleware = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response | void => {
  console.log(error instanceof CustomError)

  if (error instanceof CustomError) {
    return res.status(error.code).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Internal server error.' })
}

export default errorMiddleware
