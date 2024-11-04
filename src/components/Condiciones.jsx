import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import prestamoService from '../services/prestamo.service';
import HomeButton from './HomeButton'; 

const Condiciones = () => {
    const { id } = useParams(); // Obtiene el ID de la solicitud desde la URL
    const [prestamo, setPrestamo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate(); // Inicializa useNavigate

    useEffect(() => {
        const fetchPrestamo = async () => {
            try {
                const response = await prestamoService.obtenerPrestamoPorSolicitudId(id);
                setPrestamo(response.data);
            } catch (error) {
                console.error('Error al obtener el préstamo:', error.response ? error.response.data : error.message);
                setErrorMessage('Error al cargar los detalles del préstamo. Intenta de nuevo más tarde.');
                setOpenSnackbar(true);
            }
        };

        fetchPrestamo();
    }, [id]);

    const handleAceptar = async () => {
        try {
            await prestamoService.responderPrestamo(id, true);
            navigate('/options'); // Redirige a Options.jsx
        } catch (error) {
            console.error('Error al aceptar el préstamo:', error);
            setErrorMessage('Error al aceptar el préstamo. Intenta de nuevo más tarde.');
            setOpenSnackbar(true);
        }
    };

    const handleRechazar = async () => {
        try {
            await prestamoService.eliminarPrestamo(id);
            setErrorMessage('Has rechazado las condiciones finales del préstamo.');
            setOpenSnackbar(true);
            navigate('/options'); // Redirige a Options.jsx
        } catch (error) {
            console.error('Error al rechazar el préstamo:', error);
            setErrorMessage('Error al rechazar el préstamo. Intenta de nuevo más tarde.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (!prestamo) {
        return <Typography variant="h6">Cargando detalles del préstamo...</Typography>;
    }

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>Detalles del Préstamo</Typography>
            <Typography variant="h6">Tipo de Préstamo: {prestamo.tipoPrestamo}</Typography>
            <Typography variant="h6">Plazo: {prestamo.plazo} meses</Typography>
            <Typography variant="h6">Número de Cuotas: {prestamo.numeroDeCuotas}</Typography>
            <Typography variant="h6">Monto del Préstamo: ${prestamo.montoDelPrestamo.toFixed(1)}</Typography>
            <Typography variant="h6">Tasa de Interés Anual: {prestamo.tasaDeInteresAnual.toFixed(1)}%</Typography>
            <Typography variant="h6">Tasa de Interés Mensual: {prestamo.tasaDeInteresMensual.toFixed(1)}%</Typography>
            <Typography variant="h6">Cuota Mensual: ${prestamo.cuotaMensual.toFixed(1)}</Typography>
            <Typography variant="h6">Seguro de Desgravamen: ${prestamo.seguroDeDesgravamen.toFixed(1)}</Typography>
            <Typography variant="h6">Seguro de Incendio: ${prestamo.seguroDeIncendio.toFixed(1)}</Typography>
            <Typography variant="h6">Comisión por Administración: ${prestamo.comisionPorAdministracion.toFixed(1)}</Typography>
            <Typography variant="h6">Costo Mensual: ${prestamo.costoMensual.toFixed(1)}</Typography>
            <Typography variant="h6">Costos Totales: ${prestamo.costosTotales.toFixed(1)}</Typography>
            
            <Button variant="contained" color="primary" onClick={handleAceptar} style={{ marginRight: '10px' }}>
                Aceptar
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleRechazar}>
                Rechazar
            </Button>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
            />
        </Container>
    );
};

export default Condiciones;
