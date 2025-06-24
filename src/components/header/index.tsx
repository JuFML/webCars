import { Link } from "react-router"
import logoImg from "../../assets/logo.svg"
import { FiUser, FiLogIn, FiLogOut } from "react-icons/fi"
import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

const Header = () => {
  const { signed, loadingAuth, logout } = useContext(AuthContext)

  return (
    <header className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <div className="flex w-full max-w-7xl items-center justify-between px-4 mx-auto">
        <Link to="/">
          <img src={logoImg} alt="Logo do site" />
        </Link>

        {!loadingAuth && !signed && (
          <Link to="/login">
            <div className="border-2 rounded-full p-1 border-gray-500 cursor-pointer">
              <FiLogIn size={24} color="#000" />
            </div>
          </Link>
        )}

        {!loadingAuth && signed && (
          <div className="flex gap-5">
            <Link to="/dashboard">
              <div className="border-2 rounded-full p-1 border-gray-500 cursor-pointer">
                <FiUser size={24} color="#000" />
              </div>
            </Link>

            <div className="border-2 rounded-full p-1 border-gray-500 cursor-pointer" onClick={logout}>
              <FiLogOut size={24} color="#000" />
            </div>
          </div>
        )}

      </div>
    </header>
  )
}

export default Header