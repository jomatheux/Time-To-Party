import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar.jsx'

import { ToastContainer } from 'react-toastify'

import './App.css'
import 'react-toastify/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
