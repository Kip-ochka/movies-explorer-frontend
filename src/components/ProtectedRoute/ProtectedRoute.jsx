import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isLogin }) => {
  console.log(isLogin)
  return isLogin ? children : <Navigate to="/" replace />
}

export { ProtectedRoute }
