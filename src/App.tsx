import { RouterProvider } from "react-router"
import { router } from "./routes/router"
import { AuthProvider } from "./contexts/auth"
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  )
}

export default App
