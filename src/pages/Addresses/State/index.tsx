import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import './styles.css';

const StatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3308/state');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('statePage.error'));
        setLoading(false);
      }
    };
    fetchData();
  }, [t]);

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/state/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(t('statePage.error'));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('statePage.title')}</h1>
        <Button onClick={() => navigate('/create')}>
          {t('statePage.newState')}
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
                  <th>{t('statePage.shortName')}</th>
                  <th>{t('statePage.longName')}</th>
                  <th>{t('statePage.code')}</th>
                  <th>{t('statePage.country')}</th>
                  <th>{t('statePage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.short_name}</td>
                    <td>{item.long_name}</td>
                    <td>{item.code}</td>
                    <td>{item.country?.long_name}</td>
                    <td>
                      <div className="table-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          {t('statePage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          {t('statePage.delete')}
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

export default StatePage;
