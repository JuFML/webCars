import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState, type ReactNode } from 'react'
import { auth } from '../services/firebaseConnection'

interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  logout: () => void;
  updateUserInfo: ({ name, uid, email }: UserProps) => void;
  user: UserProps | null;
}

interface AuthProviderProps {
  children: ReactNode
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(true)

  const logout = () => {
    auth.signOut()
  }

  const updateUserInfo = ({ name, uid, email }: UserProps) => {
    setUser({ name, uid, email })
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userLogged = {
          uid: user?.uid,
          email: user?.email,
          name: user?.displayName
        }
        setUser(userLogged)
        localStorage.setItem("user", JSON.stringify(userLogged))
        setLoadingAuth(false)

      } else {
        setUser(null)
        localStorage.removeItem("user")
        setLoadingAuth(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ signed: !!user, loadingAuth, logout, updateUserInfo, user }}>
      {children}
    </AuthContext.Provider>
  )
}