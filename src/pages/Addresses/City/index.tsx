import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import './styles.css';

const CityPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3308/city');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('cityPage.error'));
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
      await axios.delete(`http://localhost:3308/city/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(t('cityPage.error'));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('cityPage.title')}</h1>
        <Button onClick={() => navigate('/create')}>
          {t('cityPage.newCity')}
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
                  <th>{t('cityPage.shortName')}</th>
                  <th>{t('cityPage.longName')}</th>
                  <th>{t('cityPage.code')}</th>
                  <th>{t('cityPage.state')}</th>
                  <th>{t('cityPage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.short_name}</td>
                    <td>{item.long_name}</td>
                    <td>{item.code}</td>
                    <td>{item.state?.long_name}</td>
                    <td>
                      <div className="table-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          {t('cityPage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          {t('cityPage.delete')}
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

export default CityPage;
