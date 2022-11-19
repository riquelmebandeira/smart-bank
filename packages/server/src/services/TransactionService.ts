import prisma from '../database/prismaClient'
import CustomError from '../utils/errors'

class TransactionService {
  async makeTransaction(
    debitedUsername: string,
    creditedUsername: string,
    transactionValue: number
  ) {
    const debitedUser = await prisma.user.findUnique({
      where: { username: debitedUsername },
      select: {
        id: true,
        accountId: true,
        account: {
          select: {
            balance: true
          }
        }
      }
    })

    if (debitedUser!.account.balance < transactionValue) {
      throw new CustomError('Insuficient balance.', 401)
    }

    const creditedUser = await prisma.user.findUnique({
      where: { username: creditedUsername }
    })

    if (!creditedUser) {
      throw new CustomError('The user to be credited does not exist.', 404)
    }

    const makeTransaction = prisma.transaction.create({
      data: {
        debitedAccountId: debitedUser!.accountId,
        creditedAccountId: creditedUser.accountId,
        value: transactionValue
      }
    })

    const updateBalance = prisma.account.update({
      where: { id: debitedUser?.accountId },
      data: {
        balance: debitedUser!.account.balance - transactionValue
      }
    })

    const result = await prisma.$transaction([makeTransaction, updateBalance])

    return result
  }
}

export default new TransactionService()
