// Home.jsx
import React, { useState } from 'react';
import { Container, Box, TextField, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';
import Options from './Options'; // Asegúrate de importar el nuevo componente

const Home = () => {
    const [rutCliente, setRutCliente] = useState('');
    const [passwordCliente, setPasswordCliente] = useState('');
    const [rutEjecutivo, setRutEjecutivo] = useState('');
    const [passwordEjecutivo, setPasswordEjecutivo] = useState('');
    const [name, setName] = useState(''); // Estado para almacenar el nombre del cliente
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar el login

    const handleLoginCliente = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientes/login', null, { params: { rut: rutCliente, password: passwordCliente } });
            console.log('Login cliente:', response.data);
            setName(response.data.nombre); // Suponiendo que el nombre viene en la respuesta
            setIsLoggedIn(true); // Cambia el estado a logueado
        } catch (error) {
            console.error('Error en login cliente:', error.response ? error.response.data : error.message);
        }
    };

    const handleLoginEjecutivo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/ejecutivos/login', null, { params: { rut: rutEjecutivo, password: passwordEjecutivo } });
            console.log('Login ejecutivo:', response.data);
            // Maneja el login del ejecutivo (ej. redirigir, guardar token, etc.)
        } catch (error) {
            console.error('Error en login ejecutivo:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Bienvenido a PrestaBanco
            </Typography>
            {isLoggedIn ? (
                <Options name={name} /> // Mostrar opciones si está logueado
            ) : (
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box flex={1} marginRight={2}>
                        <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
                            <Typography variant="h5" component="h2" gutterBottom>Login Cliente</Typography>
                            <form onSubmit={handleLoginCliente}>
                                <TextField
                                    label="RUT"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={rutCliente}
                                    onChange={(e) => setRutCliente(e.target.value)}
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={passwordCliente}
                                    onChange={(e) => setPasswordCliente(e.target.value)}
                                />
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Iniciar Sesión
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                    <Box flex={1} marginLeft={2}>
                        <Paper elevation={3} style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
                            <Typography variant="h5" component="h2" gutterBottom>Login Ejecutivo</Typography>
                            <form onSubmit={handleLoginEjecutivo}>
                                <TextField
                                    label="RUT"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={rutEjecutivo}
                                    onChange={(e) => setRutEjecutivo(e.target.value)}
                                />
                                <TextField
                                    label="Contraseña"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    value={passwordEjecutivo}
                                    onChange={(e) => setPasswordEjecutivo(e.target.value)}
                                />
                                <Button type="submit" variant="contained" color="secondary" fullWidth>
                                    Iniciar Sesión Ejecutivo
                                </Button>
                            </form>
                        </Paper>
                    </Box>
                </Box>
            )}
            {!isLoggedIn && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => window.location.href = '/register'} // Redirige a la ruta de registro
                    style={{ marginTop: '20px' }}
                >
                    Registrar Cliente
                </Button>
            )}
        </Container>
    );
};

export default Home;
