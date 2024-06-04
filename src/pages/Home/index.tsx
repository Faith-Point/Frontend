import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Importa o arquivo de estilo

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3308/faithPoint', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <div className="home-container">
      <h1>Home Page</h1>
      {data.length > 0 ? (
        <div className="dashboard">
          <h2>Dashboard</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Endereço</th>
                <th>Religião</th>
                <th>Contato</th>
                <th>Rede Social</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{`${item.address.street}, ${item.address.number}, ${item.address.complement}, ${item.address.city.short_name}-${item.address.city.state.short_name}`}</td>
                  <td>{item.religion.name}</td>
                  <td>{`${item.contact.name}, ${item.contact.phone}, ${item.contact.email}`}</td>
                  <td>
                    <a href={item.socialMedia.link} target="_blank" rel="noopener noreferrer">
                      {item.socialMedia.name}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
