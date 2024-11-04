// Evaluacion.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, MenuItem, Select, Box } from '@mui/material';
import ejecutivoService from '../services/ejecutivo.service';
import documentoService from '../services/documento.service';
import solicitudService from '../services/solicitud.service';
import HomeButton from './HomeButton';


const estadosPosibles = [
    "En revisión inicial",
    "Pendiente de documentación",
    "En evaluación",
    "Pre-Aprobada",
    "Aprobada",
    "Rechazada",
    "Cancelada por el cliente"
];

const Evaluacion = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [estadoActual, setEstadoActual] = useState({});
    const [estadoFiltro, setEstadoFiltro] = useState('');
    const navigate = useNavigate(); 
    useEffect(() => {
        obtenerSolicitudes();
    }, []);

    const obtenerSolicitudes = async () => {
        try {
            const response = await ejecutivoService.obtenerSolicitudes('');
            const solicitudesConDetalles = await Promise.all(response.data.map(solicitud => obtenerSolicitudPorId(solicitud.id)));
            setSolicitudes(solicitudesConDetalles.filter(solicitud => solicitud !== null));
        } catch (error) {
            console.error('Error al obtener solicitudes:', error);
        }
    };

    const obtenerSolicitudPorId = async (id) => {
        try {
            const response = await solicitudService.obtenerSolicitudPorId(id);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener la solicitud con ID ${id}:`, error);
            return null;
        }
    };

    const handleEstadoChange = async (id, nuevoEstado) => {
        try {
            await ejecutivoService.actualizarEstadoSolicitud(id, nuevoEstado);
            setEstadoActual(prev => ({ ...prev, [id]: nuevoEstado }));
            obtenerSolicitudes(); //refrescar
        } catch (error) {
            console.error('Error al actualizar el estado de la solicitud:', error);
        }
    };

    const handleDescargarDocumento = async (documentoId) => {
        try {
            const response = await documentoService.descargarDocumento(documentoId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `documento_${documentoId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al descargar el documento:', error);
        }
    };

    const handleEvaluarSolicitud = (solicitudId) => {
        navigate(`/evaluar/${solicitudId}`);
    };

    // Filtrar solicitudes según el estado seleccionado
    const solicitudesFiltradas = estadoFiltro
        ? solicitudes.filter(solicitud => solicitud.estado === estadoFiltro)
        : solicitudes;

    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>
                Evaluación de Solicitudes
            </Typography>
            
            {/* Menú desplegable para filtrar por estado */}
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Select
                    value={estadoFiltro}
                    onChange={(e) => setEstadoFiltro(e.target.value)}
                    displayEmpty
                >
                    <MenuItem value="">
                        <em>Todos los Estados</em>
                    </MenuItem>
                    {estadosPosibles.map((estado) => (
                        <MenuItem key={estado} value={estado}>
                            {estado}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>RUT</TableCell>
                            <TableCell>Tipo de Préstamo</TableCell>
                            <TableCell>Plazo (meses)</TableCell>
                            <TableCell>Monto del Préstamo</TableCell>
                            <TableCell>Tasa de Interés Anual (%)</TableCell>
                            <TableCell>Capacidad de Ahorro</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
    {solicitudesFiltradas.map((solicitud) => (
        <TableRow key={solicitud.id}>
            <TableCell>{solicitud.id}</TableCell>
            <TableCell>{solicitud.rut}</TableCell>
            <TableCell>{solicitud.tipoPrestamo}</TableCell>
            <TableCell>{solicitud.plazo}</TableCell>
            <TableCell>{solicitud.montoDelPrestamo}</TableCell>
            <TableCell>{solicitud.tasaDeInteresAnual}%</TableCell>
            <TableCell>{solicitud.capacidadAhorro}</TableCell>
            <TableCell>
                {solicitud.estado === "Cancelada por el cliente" ? (
                    "Cancelada por el cliente"
                ) : (
                    <Select
                        value={estadoActual[solicitud.id] || solicitud.estado}
                        onChange={(e) => handleEstadoChange(solicitud.id, e.target.value)}
                    >
                        {estadosPosibles.map((estado) => (
                            <MenuItem key={estado} value={estado}>
                                {estado}
                            </MenuItem>
                        ))}
                    </Select>
                )}
            </TableCell>
            <TableCell>
                <Box display="flex" flexDirection="column">
                    <Button
                        variant="outlined"
                        onClick={() => handleDescargarDocumento(solicitud.id)}
                        style={{ marginBottom: '10px' }}
                    >
                        Descargar Documentación
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => handleEvaluarSolicitud(solicitud.id)}
                    >
                        Evaluar Solicitud
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    ))}
</TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Evaluacion;
