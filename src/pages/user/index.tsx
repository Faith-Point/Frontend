import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoles, getAddresses, createUser } from '../../services/userService';
import { IRole } from '../../interfaces/IRole';
import { IAddress } from '../../interfaces/IAddress';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import './styles.css';

const UserPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [addressId, setAddressId] = useState('');
  const [roles, setRoles] = useState<IRole[]>([]);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await getRoles();
        const addressesResponse = await getAddresses();
        setRoles(rolesResponse.data);
        setAddresses(addressesResponse.data);
      } catch (err) {
        setError('Erro ao buscar roles e endereços.');
      }
    };
    fetchData();
  }, []);

  const handleUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess(false);

    const user = {
      name,
      email,
      password,
      role: { id: roleId },
      address: { id: addressId }
    };

    try {
      await createUser(user);
      setSuccess(true);
    } catch (err) {
      setError('Erro ao criar usuário. Verifique os dados e tente novamente.');
    }
  };

  const handleClose = () => {
    setSuccess(false);
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center align-items-center">
        <div className="bg-light p-5 rounded shadow-sm w-100 w-md-75 w-lg-50">
          <h2 className="mb-4 text-center">Cadastrar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleUser}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                required
              />
            </Form.Group>
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
            <Form.Group controlId="formRole" className="mb-3">
              <Form.Label>Cargo</Form.Label>
              <Form.Select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
              >
                <option value="">Selecione um cargo</option>
                {Array.isArray(roles) &&
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Endereço</Form.Label>
              <Form.Select
                value={addressId}
                onChange={(e) => setAddressId(e.target.value)}
                required
              >
                <option value="">Selecione um endereço</option>
                {Array.isArray(addresses) &&
                  addresses.map((address) => (
                    <option key={address.id} value={address.id}>
                      {`${address.street}, ${address.number}, ${address.neighborhood}, ${address.city.short_name}`}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Cadastrar
            </Button>
          </Form>
        </div>
      </div>

      <Modal show={success} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro Realizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cadastro realizado com sucesso!</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserPage;
