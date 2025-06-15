import { Outlet } from 'react-router'
import Header from '../header'
import Container from '../container'

const Layout = () => {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Layout