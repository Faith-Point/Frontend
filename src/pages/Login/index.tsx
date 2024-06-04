import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/authService';
import './styles.css';
import logo from '../../assets/logo.svg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login(email, password);
      setToken(response.data.auth.token);
      navigate('/home');  // Redireciona para a página inicial
    } catch (err) {
      setError('Erro no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <img src={logo} alt="Logo" className="logo" />
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
