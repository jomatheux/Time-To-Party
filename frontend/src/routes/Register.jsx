import React from 'react'
import { useState } from 'react'
import partyFetch from '../axios/config'
import { useNavigate } from 'react-router-dom'
import useToast from '../hooks/useToast'
import './Form.css'
import './Login.css'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append("name", name)
        data.append("email", email)
        data.append("password", password)
        data.append("confirmpassword", confirmpassword)
        data.append("phone", phone)
        try {
            const res = await partyFetch.post("/register", data)
            if (res.status === 200) {
                navigate(`/`);
                useToast('Usuário cadastrado com sucesso!');
            }
        } catch (error) {
            console.log(error);
            useToast(error.response.data.message, "error");
        }
    }

    return (
        <div className='form-page'>
            <form onSubmit={handleSubmit} className='form-login'>
                <h1>Cadastre-se</h1>
                <p>Crie uma conta nova para acessar o Time To Party</p>

                <label htmlFor="name">Nome</label>
                <input type="name" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="confirmpassword">Confirmar Senha</label>
                <input type="password" id="confirmpassword" name="confirmpassword" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <label htmlFor="phone">Celular</label>
                <input type="phone" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

                <button type="submit" className='btn' >Cadastrar</button>
            </form>
        </div>
    )
}

export default Register