import './styles.scss'

type FormControlProps = {
  id: string
  type: string
  placeholder: string
  className?: string
  text: string
}

const FormControl = (props: FormControlProps): JSX.Element => {
  const { id, type, placeholder, text, className } = props

  return (
    <div className={`form__control ${className}`}>
      <label htmlFor={id}>{text}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  )
}

export default FormControl
