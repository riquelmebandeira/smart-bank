import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'

const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to="/"
          />
        }
      />
    </Routes>
  )
}

export default ProtectedRoutes
