import './styles.scss'

type ButtonProps = {
  text: string
  className?: string
  variant: 'primary' | 'ghost'
  onClick?: () => void
}

const Button = (props: ButtonProps): JSX.Element => {
  const { className, variant = 'primary', text, onClick } = props

  return (
    <button
      className={`button button__${variant} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
