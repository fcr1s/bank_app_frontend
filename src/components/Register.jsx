// Register.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';

const Register = () => {
    const [rut, setRut] = useState('');
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/clientes/registrar', { rut, nombre, password, email });
            console.log('Registro exitoso:', response.data);
            // Manejar el registro (ej. redirigir a login o mostrar mensaje de éxito)
        } catch (error) {
            console.error('Error en registro:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <Typography variant="h5">Registrar Cliente</Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="RUT"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                />
                <TextField
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Registrar</Button>
            </form>
        </Container>
    );
};

export default Register;
