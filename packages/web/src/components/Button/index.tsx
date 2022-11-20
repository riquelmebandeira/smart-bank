import './styles.scss'

type ButtonProps = {
  text: string
  className?: string
  variant: 'primary' | 'ghost'
}

const Button = (props: ButtonProps): JSX.Element => {
  const { className, variant = 'primary', text } = props

  return (
    <button className={`button button__${variant} ${className}`}>{text}</button>
  )
}

export default Button
