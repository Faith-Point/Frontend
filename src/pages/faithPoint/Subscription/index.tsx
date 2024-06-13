import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import { useAuth } from '../../../contexts/AuthContext';
import './styles.css';

const FaithPointSubscriptionPage: React.FC = () => {
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
        const response = await axios.get(
          'http://localhost:3308/faithPointSubscription',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('faithPointSubscriptionPage.error'));
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
      await axios.delete(`http://localhost:3308/faithPointSubscription/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(t('faithPointSubscriptionPage.error'));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('faithPointSubscriptionPage.title')}</h1>
        <Button onClick={() => navigate('/create')}>
          {t('faithPointSubscriptionPage.newFaithPointSubscription')}
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
                  <th>{t('faithPointSubscriptionPage.faithPoint')}</th>
                  <th>{t('faithPointSubscriptionPage.user')}</th>
                  <th>{t('faithPointSubscriptionPage.isActive')}</th>
                  <th>{t('faithPointSubscriptionPage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.faith_point.name}</td>
                    <td>{item.user.name}</td>
                    <td>
                      {item.is_active
                        ? t('faithPointSubscriptionPage.active')
                        : t('faithPointSubscriptionPage.inactive')}
                    </td>
                    <td>
                      <div className="table-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          {t('faithPointSubscriptionPage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          {t('faithPointSubscriptionPage.delete')}
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

export default FaithPointSubscriptionPage;
