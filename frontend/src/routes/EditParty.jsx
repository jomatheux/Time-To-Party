import React from 'react'

import partyFetch from '../axios/config.js';

import { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useToast from '../hooks/useToast.jsx';

import './Form.css'
import { use } from 'react';

const EditParty = () => {
    const { id } = useParams();

    const [party, setParty] = useState(null);

    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    //Carregando os serviços
    useEffect(() => {
        const loadSevices = async () => {
            const res = await partyFetch.get("/services");
            setServices(res.data.response);

            loadParty();
        };

        const loadParty = async () => {
            const token = sessionStorage.getItem('token',);

            const res = await partyFetch.get(`/party/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
                }
            },);
            setParty(res.data.party);
        };

        loadSevices();
    }, []);

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const filteredService = services.filter((s) => s._id === value);

        let partyServices = party.services

        if (checked) {
            partyServices = [...partyServices, filteredService[0]];
        } else {
            partyServices = partyServices.filter((s) => s._id !== value);
        }

        setParty({ ...party, services: partyServices });
    };

    const updateParty = async (e) => {
        e.preventDefault();
        try {

            const token = sessionStorage.getItem('token');

            const res = await partyFetch.put(`/party/${id}`, party, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                navigate(`/home`);
                useToast(res.data.msg);
            }

        } catch (error) {
            useToast(error.response.data.msg, "error");
        }
    }

    if (!party) return <p>Carregando...</p>

    return (
        <div className='form-page'>
            <h2>Editando: {party.title}</h2>
            <p>Ajuste as informações da festa</p>
            <form onSubmit={(e => updateParty(e))}>
                <label>
                    <span>Nome da festa:</span>
                    <input type="text"
                        placeholder='Seja criativo...'
                        required
                        onChange={(e) => setParty({ ...party, title: e.target.value })}
                        value={party.title} />
                </label>
                <label>
                    <span>Anfitrião:</span>
                    <input type="text" placeholder='Quem está dando a festa' required onChange={(e) => setParty({ ...party, author: e.target.value })}
                        value={party.author} />
                </label>
                <label>
                    <span>Descrição:</span>
                    <textarea placeholder='Conte mais sobre a festa...' required onChange={(e) => setParty({ ...party, description: e.target.value })}
                        value={party.description}></textarea>
                </label>
                <label>
                    <span>Orçamento:</span>
                    <input type="number" placeholder='Quanto você pretende investir?' required onChange={(e) => setParty({ ...party, budget: e.target.value })}
                        value={party.budget} />
                </label>
                <label >
                    <span>Imagem:</span>
                    <input type="text" placeholder='Insira a URL de uma imagem' onChange={(e) => setParty({ ...party, image: e.target.value })}
                        value={party.image} />
                </label>
                <div>
                    <h2>Escolha os serviços</h2>
                    <div className="services-container">
                        {services.length === 0 && <p>Carregando...</p>}
                        {services.length > 0 && services.map((service) => (
                            <div className='service' key={service._id}>
                                <img src={service.image} alt={service.name} />
                                <p className="service-name">{service.name}</p>
                                <p className="service-price">R${service.price}</p>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        value={service._id}
                                        onChange={(e) => handleServices(e)}
                                        checked={party.services.find(
                                            (partyService) => partyService._id === service._id
                                        ) || ""} />
                                    <p>Marque para solicitar</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Editar Festa" className='btn' />
            </form>
        </div>
    )
}

export default EditParty