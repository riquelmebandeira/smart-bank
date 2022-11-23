import { FormEvent, useContext } from 'react'
import { Link } from 'react-router-dom'
import loginImage from '../../assets/login-image.svg'
import Button from '../../components/Button'
import Disclaimer from '../../components/Disclaimer'
import FormControl from '../../components/FormControl'
import useInput from '../../hooks/useInput'
import { IUserContext, UserContext } from '../../UserContext'
import '../../styles/auth.scss'

const Login = (): JSX.Element => {
  const username = useInput('username')
  const password = useInput('password')
  const { sign, loading, error } = useContext(UserContext) as IUserContext

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (username.validate() && password.validate()) {
      await sign('login', username.value, password.value)
    }
  }

  return (
    <div className="auth">
      <section className="welcome">
        <h1 className="welcome__message">
          Seja bem-vindo(a) ao{' '}
          <span className="welcome__message--highlight">seu </span>
          <br />
          internet banking
          <img
            className="welcome__image"
            src={loginImage}
            alt="..."
          />
        </h1>
      </section>

      <main className="main">
        <div className="main__content">
          <div className="main__header">
            <h1>Entrar na sua conta</h1>
            <p>
              Não possui uma conta? <Link to="/cadastrar">Cadastre-se</Link>
            </p>
          </div>

          <form
            className="main__form"
            onSubmit={event => handleSubmit(event)}
          >
            <FormControl
              text="Nome de usuário"
              type="text"
              id="username"
              placeholder="Ada"
              className="mt-small"
              {...username}
            />
            <FormControl
              text="Senha"
              type="password"
              id="password"
              placeholder="********"
              className="mt-small"
              {...password}
            />

            {loading ? (
              <Button
                variant="primary"
                text="Carregando..."
                className="mt-xsmall"
              />
            ) : (
              <Button
                variant="primary"
                text="Acessar minha conta"
                className="mt-xsmall"
              />
            )}
            <p className="error-feedback">{error}</p>
          </form>
          <Disclaimer className="mt-small" />
        </div>
      </main>
    </div>
  )
}

export default Login
