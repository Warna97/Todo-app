import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          padding: 2,
        }}
      >
        <Card sx={{ width: '100%', padding: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Welcome to the ToDo App
            </Typography>
            <Typography variant="body1" align="center" paragraph>
              Manage your tasks efficiently with our simple and intuitive ToDo application. Please sign in or sign up to get started.
            </Typography>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{ mb: 1 }}
                >
                  Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  size="large"
                  onClick={() => navigate('/signup')}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default HomePage;
