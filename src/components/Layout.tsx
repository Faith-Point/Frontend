import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import './layout.css'; // Importa o arquivo de estilo

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container className="mt-4">
        {children}
      </Container>
    </>
  );
};

export default Layout;
