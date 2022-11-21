import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'

const SignRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/cadastrar"
        element={<Register />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to="/login"
          />
        }
      />
    </Routes>
  )
}

export default SignRoutes
