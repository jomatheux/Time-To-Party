import React from 'react'
import partyFetch from '../axios/config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'
import { NavLink } from 'react-router-dom'
import './Form.css'
import './Login.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("email", email)
        data.append("password", password)
        try {
            const res = await partyFetch.post("/login", data)
            sessionStorage.setItem("token", res.data.token)
            if (res.status === 200) {
                navigate(`/home`);
                useToast(res.data.message);
            }
        } catch (error) {
            console.log(error)
            useToast(error.response.data.message, "error");
        }
    }

    return (
        <div className='form-page' >
            <form onSubmit={handleSubmit} className='form-login' >
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className='btn' >Entrar</button>
                <hr />
                <NavLink to="/register" className='btn' >Cadastre-se</NavLink>
            </form>
        </div>
    )
}

export default Login