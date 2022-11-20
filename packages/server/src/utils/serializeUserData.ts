import { UserWithBalance } from '../database/types'

const serializeUserData = (data: UserWithBalance) => {
  return {
    username: data.username,
    balance: data.account.balance
  }
}

export { serializeUserData }
