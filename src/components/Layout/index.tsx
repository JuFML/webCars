import { Outlet } from 'react-router'
import Header from '../header'

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout