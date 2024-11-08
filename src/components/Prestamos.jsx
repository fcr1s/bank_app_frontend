import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar } from '@mui/material';
import solicitudService from '../services/solicitud.service';
import prestamoService from '../services/prestamo.service';
import HomeButton from './HomeButton'; 

const Prestamo = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                // Obtener solicitudes del cliente
                const solicitudesResponse = await solicitudService.obtenerSolicitudesDelCliente();
                const solicitudesAprobadas = solicitudesResponse.data.filter(solicitud => solicitud.estado === 'Aprobada');

                // Obtener detalles de los préstamos vinculados a las solicitudes aprobadas
                const prestamosPromises = solicitudesAprobadas.map(solicitud =>
                    prestamoService.obtenerPrestamoPorSolicitudId(solicitud.id)
                );
                const prestamosResponses = await Promise.all(prestamosPromises);

                // Guardar los préstamos en el estado
                setPrestamos(prestamosResponses.map(response => response.data));
            } catch (error) {
                console.error('Error al obtener préstamos:', error.response ? error.response.data : error.message);
                setErrorMessage('Error al cargar los préstamos. Intenta de nuevo más tarde.');
                setOpenSnackbar(true);
            }
        };

        fetchPrestamos();
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>Detalles de los Préstamos</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tipo de Préstamo</TableCell>
                            <TableCell>Plazo (meses)</TableCell>
                            <TableCell>Número de Cuotas</TableCell>
                            <TableCell>Monto del Préstamo</TableCell>
                            <TableCell>Tasa de Interés Anual</TableCell>
                            <TableCell>Tasa de Interés Mensual</TableCell>
                            <TableCell>Cuota Mensual</TableCell>
                            <TableCell>Seguro de Desgravamen</TableCell>
                            <TableCell>Seguro de Incendio</TableCell>
                            <TableCell>Comisión por Administración</TableCell>
                            <TableCell>Costo Mensual</TableCell>
                            <TableCell>Costos Totales</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prestamos.map((prestamo, index) => (
                            <TableRow key={index}>
                                <TableCell>{prestamo.tipoPrestamo}</TableCell>
                                <TableCell>{prestamo.plazo}</TableCell>
                                <TableCell>{prestamo.numeroDeCuotas}</TableCell>
                                <TableCell>{prestamo.montoDelPrestamo}</TableCell>
                                <TableCell>{prestamo.tasaDeInteresAnual.toFixed(1)}%</TableCell>
                                <TableCell>{prestamo.tasaDeInteresMensual.toFixed(1)}%</TableCell>
                                <TableCell>{prestamo.cuotaMensual}</TableCell>
                                <TableCell>{prestamo.seguroDeDesgravamen}</TableCell>
                                <TableCell>{prestamo.seguroDeIncendio}</TableCell>
                                <TableCell>{prestamo.comisionPorAdministracion}</TableCell>
                                <TableCell>{prestamo.costoMensual}</TableCell>
                                <TableCell>{prestamo.costosTotales}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={errorMessage}
            />
        </Container>
    );
};

export default Prestamo;
