import { TransactionsWithDebitedUser } from '../database/types'

const serializeTransactions = (
  transactions: TransactionsWithDebitedUser[],
  currentUser: string
) => {
  const serialized = transactions.map(t => ({
    id: t.id,
    debitedUser: t.debitedAccount.User?.username,
    creditedUser: t.creditedAccount.User?.username,
    value: t.value,
    date: new Date(t.createdAt).toLocaleDateString(),
    received: currentUser !== t.debitedAccount.User?.username
  }))

  return serialized
}

export { serializeTransactions }
