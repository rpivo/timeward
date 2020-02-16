import React from 'react';
import { Link } from "react-router-dom";
import StyledHeader from '@styles/components/Header.styled';

export const Header = (): JSX.Element =>
  <StyledHeader>
    <nav>
      <Link to="/dashboard">Dasbhoard</Link>
      <Link to="/login">Login</Link>
    </nav>
  </StyledHeader>;