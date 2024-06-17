import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import { ICountry } from '../../../interfaces/ICountry';
import './styles.css';

const CountryPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [data, setData] = useState<ICountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentCountry, setCurrentCountry] = useState<ICountry | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3308/country');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(t('countryPage.error'));
        setLoading(false);
      }
    };
    fetchData();
  }, [t]);

  const handleEdit = (country: ICountry) => {
    setCurrentCountry(country);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/country/${id}`);
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      setError(t('countryPage.error'));
    }
  };

  const handleSave = async () => {
    if (currentCountry && currentCountry.id) {
      try {
        await axios.put(`http://localhost:3308/country/${currentCountry.id}`, currentCountry);
        setData(data.map((item) => (item.id === currentCountry.id ? currentCountry : item)));
        setShowModal(false);
        setCurrentCountry(null);
      } catch (error) {
        setError(t('countryPage.error'));
      }
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('countryPage.title')}</h1>
        <Button onClick={() => navigate('/create')}>
          {t('countryPage.newCountry')}
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
                  <th>{t('countryPage.shortName')}</th>
                  <th>{t('countryPage.longName')}</th>
                  <th>{t('countryPage.code')}</th>
                  <th>{t('countryPage.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.short_name}</td>
                    <td>{item.long_name}</td>
                    <td>{item.code}</td>
                    <td>
                      <div className="table-buttons">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          {t('countryPage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => item.id && handleDelete(item.id)}
                        >
                          {t('countryPage.delete')}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('countryPage.editCountry')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formShortName">
              <Form.Label>{t('countryPage.shortName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCountry?.short_name || ''}
                onChange={(e) =>
                  setCurrentCountry({ ...currentCountry, short_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formLongName">
              <Form.Label>{t('countryPage.longName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCountry?.long_name || ''}
                onChange={(e) =>
                  setCurrentCountry({ ...currentCountry, long_name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>{t('countryPage.code')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCountry?.code || ''}
                onChange={(e) =>
                  setCurrentCountry({ ...currentCountry, code: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('countryPage.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('countryPage.save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CountryPage;
