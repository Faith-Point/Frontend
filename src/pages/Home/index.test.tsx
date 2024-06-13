import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import HomePage from './index';
import AuthContext from '../../contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const fakeData = [
  {
    id: "a73ca63f-5da5-4725-927d-a2f910e71959",
    name: "Ponto Local 1",
    description: "Local 1",
    address: {
      street: "Rua Souza Aguiar",
      number: "1161",
      complement: "Casa",
      city: {
        short_name: "BH",
        state: {
          short_name: "MG"
        }
      }
    },
    religion: {
      name: "Catolica"
    },
    contact: {
      name: "Lucas",
      phone: "31995871750",
      email: "lucas@example.com"
    },
    socialMedia: {
      name: "Face",
      link: "linkface"
    }
  }
];

describe('HomePage', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({ data: { data: fakeData } });
  });

  test('renders HomePage and fetches data', async () => {
    const token = 'fake-token';
    const setToken = jest.fn();

    render(
      <AuthContext.Provider value={{ token, setToken }}>
        <Router>
          <HomePage />
        </Router>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByText(/Descrição/i)).toBeInTheDocument();
    expect(screen.getByText(/Endereço/i)).toBeInTheDocument();
    expect(screen.getByText(/Religião/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();
    expect(screen.getByText(/Rede Social/i)).toBeInTheDocument();

    expect(screen.getByText(fakeData[0].id)).toBeInTheDocument();
    expect(screen.getByText(fakeData[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeData[0].description)).toBeInTheDocument();
    expect(screen.getByText(`${fakeData[0].address.street}, ${fakeData[0].address.number}, ${fakeData[0].address.complement}, ${fakeData[0].address.city.short_name}-${fakeData[0].address.city.state.short_name}`)).toBeInTheDocument();
    expect(screen.getByText(fakeData[0].religion.name)).toBeInTheDocument();
    expect(screen.getByText(`${fakeData[0].contact.name}, ${fakeData[0].contact.phone}, ${fakeData[0].contact.email}`)).toBeInTheDocument();
    expect(screen.getByText(fakeData[0].socialMedia.name)).toBeInTheDocument();
  });
});
