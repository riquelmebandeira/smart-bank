import { TransactionsWithDebitedUser } from '../database/types'

const filterTransactionsByDate = (
  date: string,
  transactions: TransactionsWithDebitedUser[]
) => {
  return transactions.filter(
    t =>
      t.createdAt.toLocaleDateString() ===
      new Date(date.replace(/-/g, '/')).toLocaleDateString()
  )
}

export { filterTransactionsByDate }
