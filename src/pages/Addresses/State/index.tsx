import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import './styles.css';
import { IState } from '../../../interfaces/IState';
import { ICountry } from '../../../interfaces/ICountry';

const StatePage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<IState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentState, setCurrentState] = useState<IState | null>(null);
  const [countries, setCountries] = useState<ICountry[]>([]);

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

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3308/country');
      setCountries(response.data.data);
    } catch (error) {
      setError(t('statePage.error'));
    }
  };

  useEffect(() => {
    fetchData();
    fetchCountries();
  }, [t]);

  const handleEdit = (state: IState) => {
    setCurrentState(state);
    setShowModal(true);
  };

  const handleNew = () => {
    setCurrentState({ id: '', short_name: '', long_name: '', code: '', country: { id: '', long_name: '' } });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/state/${id}`);
      fetchData();
    } catch (error) {
      setError(t('statePage.error'));
    }
  };

  const handleSave = async () => {
    if (currentState) {
      try {
        if (currentState.id) {
          await axios.put(`http://localhost:3308/state/${currentState.id}`, currentState);
        } else {
          await axios.post('http://localhost:3308/state', currentState);
        }
        fetchData();
        setShowModal(false);
        setCurrentState(null);
      } catch (error) {
        setError(t('statePage.error'));
      }
    }
  };

  const handleChange = (field: keyof IState, value: any) => {
    if (currentState) {
      setCurrentState({
        ...currentState,
        [field]: value,
      });
    }
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('statePage.title')}</h1>
        <Button onClick={handleNew}>
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
                          onClick={() => handleEdit(item)}
                        >
                          {t('statePage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => item.id && handleDelete(item.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('statePage.editState')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formShortName">
              <Form.Label>{t('statePage.shortName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentState?.short_name || ''}
                onChange={(e) =>
                  handleChange('short_name', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formLongName">
              <Form.Label>{t('statePage.longName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentState?.long_name || ''}
                onChange={(e) =>
                  handleChange('long_name', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>{t('statePage.code')}</Form.Label>
              <Form.Control
                type="text"
                value={currentState?.code || ''}
                onChange={(e) =>
                  handleChange('code', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group controlId="formCountry">
              <Form.Label>{t('statePage.country')}</Form.Label>
              <Form.Control
                as="select"
                value={currentState?.country?.id || ''}
                onChange={(e) =>
                  handleChange('country', countries.find(c => c.id === e.target.value))
                }
              >
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.long_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('statePage.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('statePage.save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StatePage;
