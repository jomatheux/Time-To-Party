import React from 'react'

import partyFetch from '../axios/config.js'

import { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import './Home.css'

const Home = () => {
  const [parties, setParties] = useState([]);

  const token = sessionStorage.getItem("token");

  //Load parties
  useEffect(() => {
    const loadParties = async () => {

      if (!token) return;
      
      const res = await partyFetch.get("/party", {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        }
      },);

      console.log(res);

      setParties(res.data.parties);
    };

    loadParties();
  }, []);

  if (!parties) return <p>Carregando...</p>;

  return (
    <div className='home'>
      <h1>Suas Festas</h1>
      <div className="parties-container">
        {parties.lenght === 0 && <p>Não há festas cadastradas!</p>}
        {parties.map((party) => (
          <div className="party" key={party._id}>
            <img src={party.image} alt={party.title} />
            <h3>{party.title}</h3>
            <Link to={`/party/${party._id}`} className='btn-secondary'>
              Detalhes
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home