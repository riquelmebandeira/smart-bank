import { useState } from 'react'

const types = {
  username: {
    regex: /^\w{3,}$/,
    message: 'O nome de usuário precisa ter pelo menos 3 caracteres.'
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      'A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.'
  },
  number: {
    regex: /^\+?[1-9]\d*$/,
    message: 'Utilize apenas valores positivos.'
  }
}

const useInput = (type: keyof typeof types) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  function validate(value: string) {
    if (!value) {
      setError('Preencha um valor.')
      return false
    }
    if (!types[type].regex.test(value)) {
      setError(types[type].message)
      return false
    }

    setError(null)
    return true
  }

  function onChange(event: Event) {
    const target = event.target as HTMLInputElement

    if (error) validate(target.value)
    setValue(target.value)
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value)
  }
}

export default useInput
