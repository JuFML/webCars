import { useContext, type ReactNode } from "react"
import { AuthContext } from "../contexts/auth"
import { Navigate } from "react-router"

interface PrivateProps {
  children: ReactNode
}

const Private = ({ children }: PrivateProps) => {
  const { signed, loadingAuth } = useContext(AuthContext)

  if (loadingAuth) {
    return null
  }

  if (!signed) {
    return <Navigate to="/login" />
  }


  return children
}

export default Private