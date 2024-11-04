// Home.jsx
import { useState } from 'react';
import { Container, Box, TextField, Button, Paper, Typography, Snackbar, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Options from './Options'; 
import OptionsEjecutivo from './OptionsEjecutivo';
import clienteService from '../services/cliente.service';

const Home = () => {
    const [rutCliente, setRutCliente] = useState('');
    const [passwordCliente, setPasswordCliente] = useState('');
    const [rutEjecutivo, setRutEjecutivo] = useState('');
    const [passwordEjecutivo, setPasswordEjecutivo] = useState('');
    const [name, setName] = useState(''); 
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para controlar Snackbar

    const navigate = useNavigate(); 

    const handleLoginCliente = async (e) => {
        e.preventDefault();
        try {
            const response = await clienteService.login(rutCliente, passwordCliente); // Utiliza el servicio
            console.log('Login cliente:', response.data);
            setName(response.data.name); // Obtiene el nombre del cliente desde el
            setIsLoggedIn(true); // Cambia el estado a logueado
            navigate('/options', { state: { name: response.data.name } }); // Redirige a la ruta de opciones
        } catch (error) {
            console.error('Error en login cliente:', error.response ? error.response.data : error.message);
            setErrorMessage('RUT o contraseña incorrectos'); // Mensaje de error
            setOpenSnackbar(true); // Abre el Snackbar que 
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false); 
    };

    const handleLoginEjecutivo = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/ejecutivos/login', null, { params: { rut: rutEjecutivo, password: passwordEjecutivo } });
            console.log('Login ejecutivo:', response.data);
            setIsLoggedIn(true); // Cambia el estado a logueado
            navigate('/options-ejecutivo'); // Redirige a la ruta de opciones
        } catch (error) {
            console.error('Error en login ejecutivo:', error.response ? error.response.data : error.message);
            setErrorMessage('RUT o contraseña incorrectos'); // Mensaje de error
            setOpenSnackbar(true); // Abre el Snackbar
        }
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                Bienvenido a PrestaBanco
            </Typography>
            {isLoggedIn ? (
                <Options name={name} /> 
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
                    onClick={() => window.location.href = '/register'} 
                    style={{ marginTop: '20px' }}
                >
                    Registrar Cliente
                </Button>
            )}

            {/* Información sobre préstamos */}
            <Typography variant="h6" align="center" gutterBottom style={{ marginTop: '40px' }}>
                PrestaBanco ofrece una variedad de préstamos hipotecarios, adaptados a las diferentes necesidades de sus clientes. 
            </Typography>
            <Typography variant="h6" align="center" gutterBottom>
                Los tipos de préstamos más comunes incluyen:
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="1. Préstamos Hipotecarios para Primera Vivienda: Ofrecen condiciones preferenciales para aquellos clientes que adquieren su primer hogar." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. Préstamos Hipotecarios para Segunda Vivienda: Diseñados para clientes que desean invertir en una segunda propiedad." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="3. Préstamos Hipotecarios para Propiedades Comerciales: Orientados a la compra de propiedades destinadas a actividades comerciales." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="4. Préstamos Hipotecarios para Remodelación: Ofrecen financiamiento para remodelar o ampliar propiedades existentes." />
                </ListItem>
            </List>

            {/* Snackbar para mostrar mensajes de error */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
            />
        </Container>
    );
};

export default Home;
