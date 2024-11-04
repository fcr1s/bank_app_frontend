// Simulacion.jsx

import { useState } from 'react';
import { Container, TextField, Button, Typography, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import clienteService from '../services/cliente.service';
import HomeButton from './HomeButton'; 

const Simulacion = () => {
    const [tipoPrestamo, setTipoPrestamo] = useState('');
    const [valorPropiedad, setValorPropiedad] = useState('');
    const [montoPrestamo, setMontoPrestamo] = useState('');
    const [plazo, setPlazo] = useState('');
    const [tasaInteresAnual, setTasaInteresAnual] = useState('');
    const [cuotaMensual, setCuotaMensual] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSimularCredito = async (e) => {
        e.preventDefault();
        try {
            const response = await clienteService.simularCredito(tipoPrestamo, parseFloat(valorPropiedad), parseFloat(montoPrestamo), parseInt(plazo), parseFloat(tasaInteresAnual));
            setCuotaMensual(response.data); // Guarda la cuota mensual devuelta por el backend
        } catch (error) {
            console.error('Error al simular crédito:', error.response ? error.response.data : error.message);
            setErrorMessage('Error al simular crédito, verifica los datos ingresados.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>
                Simulación de Crédito
            </Typography>

            {/* Tabla de información */}
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Tipo de Préstamo</strong></TableCell>
                            <TableCell align="center"><strong>Plazo Máximo</strong></TableCell>
                            <TableCell align="center"><strong>Tasa Interés (Anual)</strong></TableCell>
                            <TableCell align="center"><strong>Monto Máximo Financiamiento</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Primera Vivienda</TableCell>
                            <TableCell align="center">30 años</TableCell>
                            <TableCell align="center">3.5% - 5.0%</TableCell>
                            <TableCell align="center">80% del valor de la propiedad</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Segunda Vivienda</TableCell>
                            <TableCell align="center">20 años</TableCell>
                            <TableCell align="center">4.0% - 6.0%</TableCell>
                            <TableCell align="center">70% del valor de la propiedad</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Propiedades Comerciales</TableCell>
                            <TableCell align="center">25 años</TableCell>
                            <TableCell align="center">5.0% - 7.0%</TableCell>
                            <TableCell align="center">60% del valor de la propiedad</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Remodelación</TableCell>
                            <TableCell align="center">15 años</TableCell>
                            <TableCell align="center">4.5% - 6.0%</TableCell>
                            <TableCell align="center">50% del valor actual de la propiedad</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Formulario de simulación */}
            <form onSubmit={handleSimularCredito}>
                <TextField
                    label="Tipo de Préstamo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={tipoPrestamo}
                    onChange={(e) => setTipoPrestamo(e.target.value)}
                />
                <TextField
                    label="Valor de Propiedad"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={valorPropiedad}
                    onChange={(e) => setValorPropiedad(e.target.value)}
                />
                <TextField
                    label="Monto de Préstamo"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={montoPrestamo}
                    onChange={(e) => setMontoPrestamo(e.target.value)}
                />
                <TextField
                    label="Plazo (años)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={plazo}
                    onChange={(e) => setPlazo(e.target.value)}
                />
                <TextField
                    label="Tasa de Interés Anual (%)"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={tasaInteresAnual}
                    onChange={(e) => setTasaInteresAnual(e.target.value)}
                />
                <Button type="submit" variant="contained" color="primary">Simular Crédito</Button>
            </form>

            {cuotaMensual !== null && (
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Cuota Mensual: ${cuotaMensual.toFixed(2)}
                </Typography>
            )}

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

export default Simulacion;
