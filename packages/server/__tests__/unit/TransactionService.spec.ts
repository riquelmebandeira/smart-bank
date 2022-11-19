import { prismaMock } from '../../src/database/singleton'
import TransactionService from '../../src/services/TransactionService'

describe('TransactionService', () => {
  const creditedUser = {
    id: 2,
    username: 'ada',
    accountId: 2,
    account: {
      balance: 100
    }
  }

  const debitedUser = {
    id: 1,
    username: 'john',
    accountId: 1,
    account: {
      balance: 100
    }
  }

  const mockTransaction = [
    {
      id: 1,
      debitedAccountId: 1,
      creditedAccountId: 2,
      value: 25,
      createdAt: '2022-11-19T15:23:34.348Z'
    },
    {
      id: 1,
      balance: 75
    },
    {
      id: 2,
      balance: 125
    }
  ]

  it('should be able to make a transaction', async () => {
    prismaMock.$transaction.mockResolvedValue(mockTransaction)

    const [transaction, debitedAccount, creditedAccount] =
      await TransactionService.makeTransaction(creditedUser, debitedUser, 25)

    expect(transaction).toHaveProperty('id')
    expect(transaction.value).toBe(25)
    expect(debitedAccount.id).toBe(1)
    expect(creditedAccount.id).toBe(2)
  })

  it('should not make a transaction that exceeds the user balance', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null)

    await expect(
      TransactionService.makeTransaction(creditedUser, debitedUser, 200)
    ).rejects.toThrow()
  })
})
