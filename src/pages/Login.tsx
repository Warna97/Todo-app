import React from 'react';
import { Container, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login to your Account
      </Typography>
      <LoginForm />
    </Container>
  );
};

export default Login;
