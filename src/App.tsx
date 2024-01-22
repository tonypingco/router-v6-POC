import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { logoutAction } from './actions/logoutAction'
import { Main, mainLoader } from './layouts/MainLayout'


import { dashboardServicesLoader, DashboardServices, dashboardAction } from './pages/Dashboard'
import { Error } from './pages/Error'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <DashboardServices />,
        action: dashboardAction,
        loader: dashboardServicesLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ]
  },
],
)

function App() {

  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  )
}

export default App
