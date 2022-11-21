import { useContext } from 'react'
import { IUserContext, UserContext } from '../UserContext'

import SignRoutes from './SignRoutes'
import ProtectedRoutes from './ProtectedRoutes'

const Routes = () => {
  const { signed } = useContext(UserContext) as IUserContext

  return signed ? <ProtectedRoutes /> : <SignRoutes />
}

export default Routes
