import './styles.scss'

type TransactionCardProps = {
  creditedUser: string
  debitedUser: string
  value: number
  date: string
  received: boolean
}

const TransactionCard = (props: TransactionCardProps): JSX.Element => {
  const { creditedUser, debitedUser, value, date, received } = props

  return (
    <div className="card">
      <div className="card__picture" />
      <div className="card__info">
        <p className="card__title">
          {`Transferência ${received ? 'recebida' : 'realizada'}`}
        </p>
        <p className="card__subtitle">
          {received ? `de ${debitedUser}` : `para ${creditedUser}`}
        </p>
      </div>
      <div className="card__info">
        <p className="card__title">R$ {value}</p>
        <p className="card__subtitle">{date}</p>
      </div>
    </div>
  )
}

export default TransactionCard
