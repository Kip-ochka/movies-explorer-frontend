import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isLogin }) => {
  return isLogin ? children : <Navigate to="/" replace />
}

export { ProtectedRoute }
