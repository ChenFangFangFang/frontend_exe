import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Home from './component/Home.jsx'
import Todolist from './component/Todolist.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // when endpoint is / , render App component
    
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path:"todos",
        element: <Todolist />
      },
    ]}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
