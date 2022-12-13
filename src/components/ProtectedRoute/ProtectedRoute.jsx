import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, isLogin }) => {
  if (!isLogin) {
    return <Navigate to='/signin' replace />
  }

  return children
}

export { ProtectedRoute }
