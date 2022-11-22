import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { IUserContext, UserContext } from '../../UserContext'
import Button from '../Button'
import './styles.scss'

const Header = (): JSX.Element => {
  const { data, userLogout } = useContext(UserContext) as IUserContext

  const handleClick = async () => {
    await userLogout()
  }

  return (
    <header className="header">
      <div className="header__content">
        <Link
          to="/"
          className="header__logo"
        >
          <img
            src={logo}
            alt="Smart Bank"
          />
          <p>Smart Bank</p>
        </Link>

        <nav className="nav">
          <p className="nav__username">{data?.username}</p>
          <Button
            variant="ghost"
            text="Sair"
            onClick={handleClick}
          />
        </nav>
      </div>
    </header>
  )
}

export default Header
