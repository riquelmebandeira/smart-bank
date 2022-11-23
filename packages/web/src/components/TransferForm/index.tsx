import axios from 'axios'
import { FormEvent, useContext, useState } from 'react'
import { makeTransaction } from '../../api'
import useInput from '../../hooks/useInput'
import { IUserContext, UserContext } from '../../UserContext'
import Button from '../Button'
import FormControl from '../FormControl'
import './styles.scss'

const TransferForm = (): JSX.Element => {
  const { data, getUser } = useContext(UserContext) as IUserContext
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const username = useInput('username')
  const amount = useInput('number')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!username.validate() || !amount.validate()) return false
    setError(null)
    const token = window.localStorage.getItem('token') as string

    try {
      setLoading(true)
      await makeTransaction(username.value, +amount.value, token)
      await getUser(token)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.error)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      className="transfer-form"
      onSubmit={e => handleSubmit(e)}
    >
      <h4>Transferência</h4>
      <div className="transfer-form__balance mt-xxsmall">
        <p>Saldo em conta</p>
        <p>R$ {data?.balance}</p>
      </div>

      <FormControl
        type="number"
        text="Valor"
        id="username"
        className="mt-tiny form-control--light"
        placeholder="Digite o valor que deseja transferir"
        {...amount}
      />

      <FormControl
        type="text"
        text="Nome de usuário"
        id="username"
        className="mt-tiny form-control--light"
        placeholder="Digite o nome de usuário"
        {...username}
      />

      {!loading ? (
        <Button
          variant="primary"
          text="Transferir"
          className="mt-small"
        />
      ) : (
        <Button
          variant="primary"
          text="Transferindo..."
          className="mt-small"
        />
      )}

      {error && <p className="error-feedback">{error}</p>}
    </form>
  )
}

export default TransferForm
