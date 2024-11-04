import { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar } from '@mui/material';
import solicitudService from '../services/solicitud.service'; // Asegúrate de importar el servicio

const SeguimientoSolicitud = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await solicitudService.obtenerSolicitudesDelCliente();
                setSolicitudes(response.data); // Asumiendo que el backend retorna un array de solicitudes
            } catch (error) {
                console.error('Error al obtener solicitudes:', error.response ? error.response.data : error.message);
                setErrorMessage('Error al cargar las solicitudes. Intenta de nuevo más tarde.');
                setOpenSnackbar(true);
            }
        };

        fetchSolicitudes();
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleCancelarSolicitud = async (id) => {
        try {
            await solicitudService.cancelarSolicitud(id); // Llama al servicio para cancelar la solicitud
            alert('Solicitud cancelada exitosamente');
            // Refresca la lista de solicitudes después de cancelar
            const updatedSolicitudes = solicitudes.filter((solicitud) => solicitud.id !== id);
            setSolicitudes(updatedSolicitudes);
        } catch (error) {
            console.error('Error al cancelar la solicitud:', error);
            alert('Error al cancelar la solicitud');
        }
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
                                    {solicitud.estado !== 'Aprobada' && (
                                        <Button 
                                            variant="outlined" 
                                            color="secondary" 
                                            onClick={() => handleCancelarSolicitud(solicitud.id)}
                                        >
                                            Cancelar
                                        </Button>
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
