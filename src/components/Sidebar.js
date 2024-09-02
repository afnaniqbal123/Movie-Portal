  import React from 'react';
  import { NavLink } from 'react-router-dom';
  import styled from 'styled-components';
  import { FaHome, FaSearch } from 'react-icons/fa';
  import sidebarBg from '../assets/netflix.png'; // Add your background image path

  const SidebarContainer = styled.div`
    width: 250px;
    height: 100%;
    background:  linear-gradient(to bottom, rgba(34, 32, 41, 1), rgba(32, 34, 41, 0.4)), url(${sidebarBg}) no-repeat center center;
    background-size: cover;
    position: fixed;
    top: 0;
    left: 0;
    padding-top: 80px;
    transition: width 0.3s;
    font-family: 'Roboto', sans-serif;

    @media (max-width: 768px) {
      width: 60px;
      padding-top: 100px;
    }
  `;

  const SidebarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    color: #fff;
    padding: 15px 20px;
    text-decoration: none;
    transition: background 0.3s;
    font-size: 18px;

    &:hover {
      background: rgba(51, 51, 51, 0.8);
    }

    &.active {
      background: rgba(255, 111, 97, 0.8);
    }

    @media (max-width: 768px) {
      padding: 10px;
      justify-content: center;
    }
  `;

  const Icon = styled.div`
    margin-right: 10px;

    @media (max-width: 768px) {
      margin-right: 0;
    }
  `;

  const Sidebar = () => {
    return (
      <SidebarContainer>
        <SidebarLink to="/">
          <Icon><FaHome /></Icon>
          Home
        </SidebarLink>
        <SidebarLink to="/search">
          <Icon><FaSearch /></Icon>
          Search
        </SidebarLink>
      </SidebarContainer>
    );
  };

  export default Sidebar;
