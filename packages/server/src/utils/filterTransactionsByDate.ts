import { TransactionsWithDebitedUser } from '../database/types'

const filterTransactionsByDate = (
  date: string,
  transactions: TransactionsWithDebitedUser[]
) => {
  return transactions.filter(t => t.createdAt.toLocaleDateString() === date)
}

export { filterTransactionsByDate }
