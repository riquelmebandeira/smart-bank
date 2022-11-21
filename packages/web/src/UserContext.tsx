import { createContext, useCallback, useEffect, useState } from 'react'
import * as api from './api'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export type UserData = {
  username: string
  balance: number
}

export interface IUserContext {
  sign: (a: 'login' | 'register', b: string, c: string) => Promise<void>
  userLogout: () => Promise<void>
  data: UserData | null
  error: null | string
  loading: boolean
  signed: boolean
}

export const UserContext = createContext<IUserContext | null>(null)

type UserStorageProps = {
  children: JSX.Element
}

export const UserStorage = ({ children }: UserStorageProps) => {
  const [data, setData] = useState<UserData | null>(null)
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const userLogout = useCallback(
    async function () {
      setData(null)
      setError(null)
      setLoading(false)
      setSigned(false)
      window.localStorage.removeItem('token')
      navigate('/login')
    },
    [navigate]
  )

  async function getUser(token: string) {
    const response = await api.getUserData(token)
    setData(response)
    setSigned(true)
  }

  async function sign(
    request: 'login' | 'register',
    username: string,
    password: string
  ) {
    try {
      setError(null)
      setLoading(true)
      const token = await api[request](username, password)
      window.localStorage.setItem('token', token)
      await getUser(token)
      navigate('/home')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message)
        setSigned(false)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token')
      if (token) {
        try {
          setError(null)
          setLoading(true)
          await api.validateToken(token)
          await getUser(token)
        } catch (err) {
          userLogout()
        } finally {
          setLoading(false)
        }
      } else {
        setSigned(false)
      }
    }
    autoLogin()
  }, [userLogout])

  return (
    <UserContext.Provider
      value={{ sign, userLogout, data, error, loading, signed }}
    >
      {children}
    </UserContext.Provider>
  )
}
