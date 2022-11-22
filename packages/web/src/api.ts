import axios from 'axios'
import { UserData } from './UserContext'

const api = axios.create({
  baseURL: `http://localhost:${process.env.PORT || '3001'}`
})

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await api.post('/login', { username, password })

  return response.data
}

export const register = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await api.post('/register', { username, password })

  return response.data
}

export const getUserData = async (token: string): Promise<UserData> => {
  const response = await api.get('/user', { headers: { authorization: token } })
  return response.data
}

export const makeTransaction = async (
  creditedUsername: string,
  value: number,
  token: string
): Promise<string> => {
  const response = await api.post(
    '/transaction',
    { creditedUsername, value },
    { headers: { authorization: token } }
  )

  return response.data
}

export const validateToken = async (token: string): Promise<UserData> => {
  const response = await api.get('/validate', {
    headers: { authorization: token }
  })
  return response.data
}

export default api
