import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Sidebar from '../../../components/Sidebar';
import './styles.css';
import { ICity } from '../../../interfaces/ICity';
import { IState } from '../../../interfaces/IState';
import { ICountry } from '../../../interfaces/ICountry';

const CityPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<ICity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [currentCity, setCurrentCity] = useState<ICity | null>(null);
  const [states, setStates] = useState<IState[]>([]);
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [filteredStates, setFilteredStates] = useState<IState[]>([]);

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

  const fetchStates = async () => {
    try {
      const response = await axios.get('http://localhost:3308/state');
      setStates(response.data.data);
    } catch (error) {
      setError(t('cityPage.error'));
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3308/country');
      setCountries(response.data.data);
    } catch (error) {
      setError(t('cityPage.error'));
    }
  };

  useEffect(() => {
    fetchData();
    fetchStates();
    fetchCountries();
  }, [t]);

  const handleEdit = (city: ICity) => {
    if (city.state && city.state.country) {
      setFilteredStates(states.filter(state => state.country.id === city.state?.country.id));
    } else {
      setFilteredStates([]);
    }
    setCurrentCity(city);
    setShowCountry(false);
    setShowModal(true);
  };

  const handleNew = () => {
    setCurrentCity({ id: '', short_name: '', long_name: '', code: '', state: { id: '', long_name: '', country: { id: '', long_name: '' } } });
    setFilteredStates([]);
    setShowCountry(false);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3308/city/${id}`);
      fetchData();
    } catch (error) {
      setError(t('cityPage.error'));
    }
  };

  const handleSave = async () => {
    if (currentCity) {
      try {
        if (currentCity.id) {
          await axios.put(`http://localhost:3308/city/${currentCity.id}`, currentCity);
        } else {
          await axios.post('http://localhost:3308/city', currentCity);
        }
        fetchData();
        setShowModal(false);
        setCurrentCity(null);
      } catch (error) {
        setError(t('cityPage.error'));
      }
    }
  };

  const handleChange = (field: keyof ICity, value: any) => {
    if (currentCity) {
      if (field === 'state') {
        const selectedState = states.find(s => s.id === value);
        if (selectedState) {
          setCurrentCity({
            ...currentCity,
            state: selectedState,
          });
        }
      } else {
        setCurrentCity({
          ...currentCity,
          [field]: value,
        });
      }
    }
  };

  const handleCountryChange = (countryId: string) => {
    const selectedCountry = countries.find(c => c.id === countryId);
    const filtered = states.filter(state => state.country.id === countryId);
    setFilteredStates(filtered);
    if (selectedCountry && currentCity) {
      setCurrentCity({
        ...currentCity,
        state: { ...currentCity.state, id: '', long_name: '', country: selectedCountry },
      } as ICity);
    }
  };

  const handleShowCountry = () => {
    setShowCountry(true);
  };

  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>{t('cityPage.title')}</h1>
        <Button onClick={handleNew}>
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
                          onClick={() => handleEdit(item)}
                        >
                          {t('cityPage.edit')}
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => item.id && handleDelete(item.id)}
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('cityPage.editCity')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formShortName">
              <Form.Label>{t('cityPage.shortName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCity?.short_name || ''}
                onChange={(e) => handleChange('short_name', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLongName">
              <Form.Label>{t('cityPage.longName')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCity?.long_name || ''}
                onChange={(e) => handleChange('long_name', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCode">
              <Form.Label>{t('cityPage.code')}</Form.Label>
              <Form.Control
                type="text"
                value={currentCity?.code || ''}
                onChange={(e) => handleChange('code', e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>{t('cityPage.state')}</Form.Label>
              <Form.Control
                as="select"
                value={currentCity?.state?.id || ''}
                onChange={(e) => handleChange('state', e.target.value)}
              >
                <option value="">{t('cityPage.selectState')}</option>
                {filteredStates.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.long_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" className="small-button" onClick={handleShowCountry}>
              {t('cityPage.changeCountry')}
            </Button>
            {showCountry && (
              <Form.Group controlId="formCountry" className="mt-3 small-form-group">
                <Form.Label>{t('cityPage.country')}</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleCountryChange(e.target.value)}
                >
                  <option value="">{t('cityPage.selectCountry')}</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.long_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('cityPage.cancel')}
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {t('cityPage.save')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CityPage;
