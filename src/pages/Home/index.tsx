import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar';
import './styles.css';

const HomePage: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setLoading(false);
      } catch (error) {
        setError('Erro ao buscar os dados');
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/faithPoint/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError('Erro ao deletar o ponto de fé');
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1 className="text-center mb-4">Dashboard</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <div className="dashboard">
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Endereço</th>
                    <th>Religião</th>
                    <th>Contato</th>
                    <th>Rede Social</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{`${item.address.street}, ${item.address.number}, ${item.address.complement}, ${item.address.city.short_name}-${item.address.city.state.short_name}`}</td>
                      <td>{item.religion.name}</td>
                      <td>{`${item.contact.name}, ${item.contact.phone}, ${item.contact.email}`}</td>
                      <td>
                        <a
                          href={item.socialMedia.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.socialMedia.name}
                        </a>
                      </td>
                      <td>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(item.id)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
