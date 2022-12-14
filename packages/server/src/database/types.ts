import { Prisma } from '@prisma/client'

const userWithBalance = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    username: true,
    accountId: true,
    account: { select: { balance: true } }
  }
})

type UserWithBalance = Prisma.UserGetPayload<typeof userWithBalance>

const transactionsWithDebitedUser = Prisma.validator<Prisma.TransactionArgs>()({
  include: {
    debitedAccount: {
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    },
    creditedAccount: {
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    }
  }
})

type TransactionsWithDebitedUser = Prisma.TransactionGetPayload<
  typeof transactionsWithDebitedUser
>

export { UserWithBalance, TransactionsWithDebitedUser }
