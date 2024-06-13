import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import './styles.css';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();
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
        const response = await axios.get('http://localhost:3308/contact', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('contactPage.error'));
        setLoading(false);
      }
    };

    fetchData();
  }, [t, token, navigate]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(t('contactPage.error'));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('contactPage.title')}</h1>
        <Button onClick={() => navigate('/create')}>
          {t('contactPage.newContact')}
        </Button>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>{t('contactPage.name')}</th>
                  <th>{t('contactPage.phone')}</th>
                  <th>{t('contactPage.email')}</th>
                  <th>{t('contactPage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                      <div className="table-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          {t('contactPage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          {t('contactPage.delete')}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
