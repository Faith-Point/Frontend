import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <NavDropdown title="Endereço" id="address-nav-dropdown">
              <NavDropdown.Item as={Link} to="/country">
                País
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/state">
                Estado
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/city">
                Cidade
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/address">
                Endereço
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/role">
              Permissão
            </Nav.Link>
            <Nav.Link as={Link} to="/user">
              Usuário
            </Nav.Link>
            <NavDropdown title="Faith Point" id="faith-point-nav-dropdown">
              <NavDropdown.Item as={Link} to="/faithPointImage">
                Imagens
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faithPointRating">
                Avaliações
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faithPointReligions">
                Religiões
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faithPointSchedule">
                Horários
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faithPointService">
                Serviços
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/faithPointSubscription">
                Assinaturas
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Contatos" id="contacts-nav-dropdown">
              <NavDropdown.Item as={Link} to="/contact">
                Contatos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/socialMedia">
                Redes Sociais
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
