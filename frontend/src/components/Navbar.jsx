import React from 'react'

import { NavLink } from 'react-router-dom'

import { useNavigate } from 'react-router-dom';
import Login from '../routes/Login';

import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    if (window.confirm('Deseja realmente sair?')) {
      sessionStorage.removeItem('token');
      navigate('/')
    }
  }
    
  if (!sessionStorage.getItem('token')  || window.location.pathname === '/' || window.location.pathname === '/register') {

    sessionStorage.removeItem('token');

    return (
      <nav id='navbar'>
        <h2>Time To Party</h2>
        <ul>
        </ul>
      </nav>
    )
  }

  return (
    <nav id='navbar'>
      <h2>Time To Party</h2>
      <ul>
        <li>
          <NavLink to="/home" >Minhas Festas</NavLink>
        </li>
        <li>
          <NavLink to="/party/new" className="btn" >Criar Festa</NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={(e) => handleLogout(e)}>Sair</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar