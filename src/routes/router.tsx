import { createBrowserRouter } from "react-router";
import Layout from "../components/Layout";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
      }
    ]
  }
])