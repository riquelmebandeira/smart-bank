import { Transaction } from '@prisma/client'

const filterTransactionsByDate = (
  date: string,
  transactions: Transaction[]
) => {
  return transactions.filter(t => t.createdAt.toLocaleDateString() === date)
}

export { filterTransactionsByDate }
