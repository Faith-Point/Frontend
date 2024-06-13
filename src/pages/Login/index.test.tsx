import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LoginPage from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('LoginPage', () => {
  beforeEach(() => {
    mockedAxios.post.mockClear();
  });

  test('renders login form', () => {
    render(<LoginPage />);
    
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  test('allows the user to login successfully', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: { accessToken: 'fake-access-token', refreshToken: 'fake-refresh-token' },
    });

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'lucas@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: '123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3308/auth/login', {
      email: 'lucas@example.com',
      password: '123',
    });

    await screen.findByText(/login bem-sucedido/i);
  });

  test('shows error message on login failure', async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } },
    });

    render(<LoginPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'lucas@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/senha/i), { target: { value: '123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

    const errorMessage = await screen.findByText(/erro no login. verifique suas credenciais./i);
    expect(errorMessage).toBeInTheDocument();
  });
});
