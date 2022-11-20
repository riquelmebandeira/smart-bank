import './styles.scss'

type DisclaimerProps = {
  className?: string
}

const Disclaimer = ({ className }: DisclaimerProps): JSX.Element => {
  return (
    <p className={`disclaimer ${className}`}>
      Leia a nossa{' '}
      <span className="disclaimer--highlight">Política de Privacidade.</span>
    </p>
  )
}

export default Disclaimer
