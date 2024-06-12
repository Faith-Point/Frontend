import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { login } from '../../services/authService';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import './styles.css';
import logo from '../../assets/logo.svg';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login(email, password);
      if (response.data && response.data.auth && response.data.auth.token) {
        setToken(response.data.auth.token);
        setSuccess(true);
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      } else {
        setError('Erro no login. Verifique suas credenciais.');
      }
    } catch (err) {
      setError('Erro no login. Verifique suas credenciais.');
    }
  };

  const handleUser = () => {
    navigate('/user'); 
  };

  return (
    <Container className="mt-5 d-flex flex-column justify-content-center align-items-center">
      <img src={logo} alt="Logo" className="logo mb-4" />
      <h2 className="mb-4 text-center">Login</h2>
      <div className="bg-light p-5 rounded shadow-sm w-100 w-md-75 w-lg-50">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mb-3">
            Entrar
          </Button>
        </Form>
        <Button variant="secondary" onClick={handleUser} className="w-100">
          Cadastrar
        </Button>
      </div>

      <Modal show={success} onHide={() => setSuccess(false)} backdrop="static">
        <Modal.Header>
          <Modal.Title>Login Realizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login realizado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => navigate('/home')}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LoginPage;
