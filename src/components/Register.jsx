// Register.jsx
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import clienteService from '../services/cliente.service';
import {useNavigate } from "react-router-dom";

const Register = () => {
    const [rut, setRut] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const cliente = { rut, name, password, email };
            const response = await clienteService.registrarCliente(cliente);
            console.log('Registro exitoso:', response.data);
            alert('Cliente registrado con éxito');
            navigate('/');
        } catch (error) {
            console.error('Error en registro:', error.response ? error.response.data : error.message);
            alert('Error al registrar cliente: ' + (error.response ? error.response.data : error.message));
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
