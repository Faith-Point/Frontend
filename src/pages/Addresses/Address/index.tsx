import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import './styles.css';

const AddressPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3308/address');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('addressesPage.error'));
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
      await axios.delete(`http://localhost:3308/address/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      setError(t('addressesPage.error'));
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('addressesPage.title')}</h1>
        <Button onClick={() => navigate('/create')}>{t('addressesPage.newAddress')}</Button>
        {loading ? (
          <Spinner animation="border" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>{t('addressesPage.street')}</th>
                  <th>{t('addressesPage.number')}</th>
                  <th>{t('addressesPage.complement')}</th>
                  <th>{t('addressesPage.neighborhood')}</th>
                  <th>{t('addressesPage.city')}</th>
                  <th>{t('addressesPage.state')}</th>
                  <th>{t('addressesPage.country')}</th>
                  <th>{t('addressesPage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.street}</td>
                    <td>{item.number}</td>
                    <td>{item.complement}</td>
                    <td>{item.neighborhood}</td>
                    <td>{item.city?.name}</td>
                    <td>{item.city?.state?.name}</td>
                    <td>{item.city?.state?.country?.name || 'N/A'}</td>
                    <td>
                      <div className="d-flex justify-content-between">
                        <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item.id)}>{t('addressesPage.edit')}</Button>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>{t('addressesPage.delete')}</Button>
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

export default AddressPage;
