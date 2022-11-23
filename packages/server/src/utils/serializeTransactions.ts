import { TransactionsWithDebitedUser } from '../database/types'

const serializeTransactions = (
  transactions: TransactionsWithDebitedUser[],
  currentUser: string
) => {
  const serialized = transactions.map(t => ({
    id: t.id,
    debitedUser: t.debitedAccount.user?.username,
    creditedUser: t.creditedAccount.user?.username,
    value: t.value,
    date: new Date(t.createdAt).toLocaleDateString(),
    received: currentUser !== t.debitedAccount.user?.username
  }))

  return serialized
}

export { serializeTransactions }
