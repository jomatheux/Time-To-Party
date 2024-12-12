import React from 'react'

import partyFetch from '../axios/config.js';

import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const CreateParty = () => {

  const[services, setServices] = useState([]);

  //Carregando serviços
  useEffect(() => {
    const loadSevices = async () => {
      const res = await partyFetch.get("/services");
      setServices(res.data.response);
      console.log(res);
    }

    loadSevices();
  }, [])




  return (
    <div className='form-page'>
      <h2>Crie sua próxima festa</h2>
      <p>Defina o seu orçamento e escolha seus serviços</p>
      <form>
        <label>
          <span>Nome da festa:</span>
          <input type="text" placeholder='Seja criativo...' required/>
        </label>
        <label>
          <span>Anfitrião:</span>
          <input type="text" placeholder='Quem está dando a festa' required/>
        </label>
        <label>
          <span>Descrição:</span>
          <textarea placeholder='Conte mais sobre a festa...' required></textarea>
        </label>
        <label>
          <span>Orçamento:</span>
          <input type="number" placeholder='Quanto você pretende investir?' required/>
        </label>
        <label >
          <span>Imagem:</span>
          <input type="text" placeholder='Insira a URL de uma imagem'/>
        </label>
        <div>
          <h2>Escolha os serviços</h2>
          <div className="services-container">
            {services.length === 0 && <p>Carregando...</p>}
            {services.length >0 && services.map((service) =>(
              <div className='service' key={service._id}>
                <img src={service.img} alt={service.name} />
                <p className="service-name">{service.name}</p>
                <p className="service-price">R${service.price}</p>
                <div className="checkbox-container">
                  <input type="checkbox" value={service._id}/>
                  <p>Marque para solicitar</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <input type="submit" value="Criar Festa" className='btn'/>
      </form>
    </div>
  )
}

export default CreateParty