import { useContext, useEffect, useState } from 'react'
import { getTransactions, Transaction } from '../../api'
import { IUserContext, UserContext } from '../../UserContext'
import Loading from '../Loading'
import TransactionCard from '../TransactionCard'
import './styles.scss'

const Transactions = (): JSX.Element => {
  const user = useContext(UserContext) as IUserContext
  const [transactions, setTransactions] = useState<Transaction[] | []>([])
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [_error, setError] = useState(false)

  useEffect(() => {
    try {
      setLoading(true)
      const token = window.localStorage.getItem('token') as string
      getTransactions(token, category, date).then(data => setTransactions(data))
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [date, category, user.data?.balance])

  return (
    <section className="transactions">
      <h4>Transações</h4>

      <div className="filters mt-xxsmall">
        <h5>Filtros</h5>
        <select onChange={({ target }) => setCategory(target.value)}>
          <option value="">Categoria</option>
          <option value="debited">Realizadas</option>
          <option value="credited">Recebidas</option>
        </select>
        <input
          type="date"
          lang="pt-BR"
          onChange={({ target }) => setDate(target.value)}
        />
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="transactions__list mt-xxsmall">
          {transactions.length < 1 ? (
            <p>Nenhuma transação foi encontrada</p>
          ) : (
            transactions.map(t => (
              <TransactionCard
                key={t.id}
                {...t}
              />
            ))
          )}
        </div>
      )}
    </section>
  )
}

export default Transactions
