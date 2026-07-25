import { Navigate, useLocation } from 'react-router-dom'
import { getStoredToken } from '../src/auth'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation()
  const token = getStoredToken()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

export default ProtectedRoute