import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import solicitudService from '../services/solicitud.service';
import HomeButton from './HomeButton'; 

const SeguimientoSolicitud = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [razonesRechazo, setRazonesRechazo] = useState([]);
    const [setSelectedSolicitud] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await solicitudService.obtenerSolicitudesDelCliente();
                setSolicitudes(response.data);
            } catch (error) {
                console.error('Error al obtener solicitudes:', error.response ? error.response.data : error.message);
                setErrorMessage('Error al cargar las solicitudes. Intenta de nuevo más tarde.');
                setOpenSnackbar(true);
            }
        };

        fetchSolicitudes();
    }, []);

    const handleCancelarSolicitud = async (id) => {
        try {
            await solicitudService.cancelarSolicitud(id);
            setSolicitudes((prevSolicitudes) =>
                prevSolicitudes.map((solicitud) =>
                    solicitud.id === id ? { ...solicitud, estado: 'Cancelada por el cliente' } : solicitud
                )
            );
        } catch (error) {
            console.error('Error al cancelar solicitud:', error);
            setErrorMessage('Error al cancelar la solicitud. Intenta de nuevo más tarde.');
            setOpenSnackbar(true);
        }
    };

    const handleVerRazones = (solicitud) => {
        setRazonesRechazo(solicitud.razonesRechazo);
        setSelectedSolicitud(solicitud);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedSolicitud(null);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleVerCondiciones = (id) => {
        navigate(`/condiciones/${id}`); // Redirige a Condiciones.jsx con el ID de la solicitud
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>Seguimiento de Solicitudes</Typography>
            
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Solicitud</TableCell>
                            <TableCell>Tipo de Préstamo</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {solicitudes.map((solicitud) => (
                            <TableRow key={solicitud.id}>
                                <TableCell>{solicitud.id}</TableCell>
                                <TableCell>{solicitud.tipoPrestamo}</TableCell>
                                <TableCell>{solicitud.estado}</TableCell>
                                <TableCell>
                                    {solicitud.estado === 'Pre-Aprobada' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleVerCondiciones(solicitud.id)}
                                        >
                                            Condiciones Finales
                                        </Button>
                                    )}
                                    {/* Mostrar botón solo si la solicitud es rechazada */}
                                    {solicitud.estado === "Rechazada" && (
                                        <Button
                                            variant="outlined"
                                            color="warning"
                                            onClick={() => handleVerRazones(solicitud)}
                                        >
                                            Ver Razones de Rechazo
                                        </Button>
                                    )}
                                    {/* Mostrar botón de cancelar si aplica */}
                                    {solicitud.estado !== 'Aprobada' && solicitud.estado !== 'Cancelada por el cliente' && solicitud.estado !== "Rechazada" && solicitud.estado !== "En desembolso" ? (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleCancelarSolicitud(solicitud.id)}
                                        >
                                            Cancelar
                                        </Button>
                                    ) : null}
                                    
                                    {/* Mostrar "Sin acciones" solo si no hay botones visibles */}
                                    {solicitud.estado !== 'Rechazada' && !(
                                        solicitud.estado === 'Pre-Aprobada' ||
                                        solicitud.estado !== 'Aprobada' && 
                                        solicitud.estado !== 'Cancelada por el cliente'
                                    ) ? 'Sin acciones' : null}
                                </TableCell>
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

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Razones de Rechazo</DialogTitle>
                <DialogContent>
                    {razonesRechazo.length > 0 ? (
                        razonesRechazo.map((razon, index) => (
                            <Typography key={index} variant="body1">
                                - {razon}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body1">No hay razones de rechazo disponibles.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default SeguimientoSolicitud;
