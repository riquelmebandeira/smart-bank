import prisma from '../database/prismaClient'
import { UserWithBalance } from '../database/types'
import CustomError from '../utils/errors'

class TransactionService {
  async makeTransaction(
    debitedUser: UserWithBalance,
    creditedUser: UserWithBalance,
    transactionValue: number
  ) {
    if (debitedUser.account.balance < transactionValue) {
      throw new CustomError('Insuficient balance.', 401)
    }

    const createTransaction = prisma.transaction.create({
      data: {
        debitedAccountId: debitedUser.accountId,
        creditedAccountId: creditedUser.accountId,
        value: transactionValue
      }
    })

    const updateDebitedAcc = prisma.account.update({
      where: { id: debitedUser.accountId },
      data: {
        balance: debitedUser.account.balance - transactionValue
      }
    })

    const updateCreditedAcc = prisma.account.update({
      where: { id: creditedUser.accountId },
      data: {
        balance: debitedUser.account.balance + transactionValue
      }
    })

    return await prisma.$transaction([
      createTransaction,
      updateDebitedAcc,
      updateCreditedAcc
    ])
  }

  async getTransactions(accountId: number, category: string) {
    const include = {
      debitedAccount: {
        include: {
          User: {
            select: {
              username: true
            }
          }
        }
      },
      creditedAccount: {
        include: {
          User: {
            select: {
              username: true
            }
          }
        }
      }
    }

    if (category === 'debited') {
      return await prisma.transaction.findMany({
        where: { debitedAccountId: accountId },
        include,
        orderBy: { createdAt: 'desc' }
      })
    }

    if (category === 'credited') {
      return await prisma.transaction.findMany({
        where: { creditedAccountId: accountId },
        include,
        orderBy: { createdAt: 'desc' }
      })
    }

    return await prisma.transaction.findMany({
      where: {
        OR: [
          {
            debitedAccountId: accountId
          },
          {
            creditedAccountId: accountId
          }
        ]
      },
      include,
      orderBy: { createdAt: 'desc' }
    })
  }
}

export default new TransactionService()
