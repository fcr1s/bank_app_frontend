import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar } from '@mui/material';
import solicitudService from '../services/solicitud.service';

const SeguimientoSolicitud = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

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

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
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
                                    {solicitud.estado !== 'Aprobada' && solicitud.estado !== 'Cancelada por el cliente' ? (
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            onClick={() => handleCancelarSolicitud(solicitud.id)}
                                        >
                                            Cancelar
                                        </Button>
                                    ) : (
                                        'Sin acciones'
                                    )}
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
        </Container>
    );
};

export default SeguimientoSolicitud;
