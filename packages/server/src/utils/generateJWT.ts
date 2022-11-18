import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const generateJWT = (data: any): string => {
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign(data, secret, { expiresIn: '24h' })
  return token
}

export { generateJWT }
