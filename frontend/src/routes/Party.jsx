import partyFetch from "../axios/config";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import useToast from "../hooks/useToast.jsx";

import './Party.css';
import './Form.css';
const Party = () => {

  const { id } = useParams();

  const [party, setParty] = useState(null);

  const navigate = useNavigate();


  //Carregando festas
  useEffect(() => {
    const loadParty = async () => {
      const token = sessionStorage.getItem('token');
      const res = await partyFetch.get(`/party/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        }
      },);
      console.log(res.data);
      setParty(res.data.party);
    };

    loadParty();
  }, []);

  //Deletando festa
  const deleteParty = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta festa?")) {
      const token = sessionStorage.getItem('token');

      const res = await partyFetch.delete(`/party/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
        }
      },);

      if (res.status === 200) {
        navigate("/home");
        useToast(res.data.msg);
      }
    }
  }

  if (!party) return <p>Carrengando...</p>;

  return (
    <div className="party">
      <h1>{party.title}</h1>
      <div className="actions-container">
        <Link to={`/party/edit/${party._id}`} className="btn">Editar</Link>
        <button onClick={deleteParty} className="btn-secondary">Excluir</button>
      </div>
      <p>Orçamento: R${party.budget}</p>
      <h3>Serviços Contratados:</h3>
      <div className="services-container">
        {party.services.map((service) => (
          <div className="service" key={service._id}>
            <img src={service.image} alt={service.name} />
            <p>{service.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Party