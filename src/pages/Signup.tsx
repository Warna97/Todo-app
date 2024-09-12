import React from 'react';
import { Container, Typography } from '@mui/material';
import SignupForm from '../components/SignupForm';

const Signup: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create a New Account
      </Typography>
      <SignupForm />
    </Container>
  );
};

export default Signup;
