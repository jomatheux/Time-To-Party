import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {createBrowserRouter, RouterProvider} from 'react-router-dom'

//Pages
import Home from './routes/Home.jsx'
import CreateParty from './routes/CreateParty.jsx'
import Party from './routes/Party.jsx'
import EditParty from './routes/EditParty.jsx'
import Login from './routes/Login.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Register from './routes/Register.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/register', element: <Register />},
      { 
        path: '/home', 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/party/new', 
        element: (
          <ProtectedRoute>
            <CreateParty />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/party/:id', 
        element: (
          <ProtectedRoute>
            <Party />
          </ProtectedRoute>
        ),
      },
      { 
        path: '/party/edit/:id', 
        element: (
          <ProtectedRoute>
            <EditParty />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
