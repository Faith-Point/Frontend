import React from 'react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import './layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="content-wrapper">
        <Container className="mt-4">{children}</Container>
      </div>
    </>
  );
};

export default Layout;
