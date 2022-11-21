import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import './styles/global.scss'
import { UserStorage } from './UserContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserStorage>
        <Routes />
      </UserStorage>
    </BrowserRouter>
  </React.StrictMode>
)
