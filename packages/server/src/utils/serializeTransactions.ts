import { AccountWithTransactions } from '../database/types'

const serializeTransactions = ({
  credited = [],
  debited = []
}: AccountWithTransactions) => {
  const serialized = [...credited, ...debited]

  serialized.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return serialized
}

export { serializeTransactions }
