// Options.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';

const Options = ({ name }) => {
    return (
        <Container style={{ marginTop: '20px' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Bienvenido, {name}!
            </Typography>
            <Typography align="center" variant="h6" gutterBottom>
                ¿Qué deseas hacer?
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={() => window.location.href = '/solicitud'} // Ruta para iniciar solicitud
                style={{ margin: '10px' }}
            >
                Iniciar Solicitud
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => window.location.href = '/simular-credito'} // Ruta para simular crédito
                style={{ margin: '10px' }}
            >
                Simular Crédito
            </Button>
        </Container>
    );
};

export default Options;
