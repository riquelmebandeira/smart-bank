import './styles.scss'

type FormControlProps = {
  id: string
  type: string
  placeholder?: string
  className?: string
  text: string
  value: string
  onChange: any
  error: string | null
  onBlur: any
}

const FormControl = (props: FormControlProps): JSX.Element => {
  const {
    id,
    type,
    placeholder,
    text,
    className,
    value,
    onChange,
    error,
    onBlur
  } = props

  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={id}>{text}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      {error && <p className="error-feedback">{error}</p>}
    </div>
  )
}

export default FormControl
