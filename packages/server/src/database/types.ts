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

const accountWithTransactions = Prisma.validator<Prisma.AccountArgs>()({
  include: {
    debited: true,
    credited: true
  }
})

type AccountWithTransactions = Prisma.AccountGetPayload<
  typeof accountWithTransactions
>

export { UserWithBalance, AccountWithTransactions }
