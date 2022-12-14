import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import CustomError from '../utils/errors'

const errorMiddleware = (
  error: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response | void => {
  console.log(error)

  if (error instanceof CustomError) {
    return res.status(error.code).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Erro interno do servidor.' })
}

export default errorMiddleware
