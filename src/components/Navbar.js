import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import navbarBg from '../assets/netflix.png'; // Add your background image path

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(34, 32, 41, 1), rgba(32, 34, 41, 0.5)), url(${navbarBg}) no-repeat center center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

const Logo = styled(Link)`
  color: #ff6f61;
  font-size: 24px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #fff;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo to="/">Movie Portal</Logo>
    </NavbarContainer>
  );
};

export default Navbar;
