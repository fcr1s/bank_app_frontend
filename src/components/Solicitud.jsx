import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import solicitudService from '../services/solicitud.service'; 
import HomeButton from './HomeButton'; 

const Solicitud = () => {
    const [tipoPrestamo, setTipoPrestamo] = useState('');
    const [valorPropiedad, setValorPropiedad] = useState('');
    const [montoPrestamo, setMontoPrestamo] = useState('');
    const [plazo, setPlazo] = useState('');
    const [tasaInteresAnual, setTasaInteresAnual] = useState('');
    const [documentos, setDocumentos] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Para redirección

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setDocumentos(files);
        // Mensaje de éxito al cargar el documento
        if (files.length > 0) {
            setSuccessMessage('Documento cargado exitosamente.');
            setOpenSnackbar(true);
        }
    };

    const handleCrearSolicitud = async (e) => {
        e.preventDefault();
        try {
            await solicitudService.crearSolicitud(tipoPrestamo, parseFloat(valorPropiedad), parseFloat(montoPrestamo), parseFloat(tasaInteresAnual), parseInt(plazo), documentos);
            setSuccessMessage('Solicitud enviada exitosamente.');
            alert('Solicitud enviada exitosamente.');
            navigate('/options');
        } catch (error) {
            console.error('Error al crear solicitud:', error.response ? error.response.data : error.message);
            setErrorMessage('Error al crear la solicitud. Verifique los datos.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '30px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>Crear Solicitud de Préstamo</Typography>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Detalles del Préstamo</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo de Préstamo</TableCell>
                                <TableCell>Plazo Máximo</TableCell>
                                <TableCell>Tasa Interés (Anual)</TableCell>
                                <TableCell>Monto Máximo Financiamiento</TableCell>
                                <TableCell>Requisitos Documentales</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Primera Vivienda</TableCell>
                                <TableCell>30 años</TableCell>
                                <TableCell>3.5% - 5.0%</TableCell>
                                <TableCell>80% del valor de la propiedad</TableCell>
                                <TableCell>Comprobante de ingresos, Certificado de avalúo, Historial crediticio</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Segunda Vivienda</TableCell>
                                <TableCell>20 años</TableCell>
                                <TableCell>4.0% - 6.0%</TableCell>
                                <TableCell>70% del valor de la propiedad</TableCell>
                                <TableCell>Comprobante de ingresos, Certificado de avalúo, Historial crediticio, Escritura primera vivienda</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Propiedades Comerciales</TableCell>
                                <TableCell>25 años</TableCell>
                                <TableCell>5.0% - 7.0%</TableCell>
                                <TableCell>60% del valor de la propiedad</TableCell>
                                <TableCell>Comprobante de ingresos, Certificado de avalúo, Estado financiero del negocio, Plan de negocios</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Remodelación</TableCell>
                                <TableCell>15 años</TableCell>
                                <TableCell>4.5% - 6.0%</TableCell>
                                <TableCell>50% del valor actual de la propiedad</TableCell>
                                <TableCell>Comprobante de ingresos, Certificado de avalúo, Presupuesto de remodelación</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <form onSubmit={handleCrearSolicitud}>
                <Box mt={4} mb={2}>
                    <TextField
                        label="Tipo de Préstamo"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={tipoPrestamo}
                        onChange={(e) => setTipoPrestamo(e.target.value)}
                    />
                    <TextField
                        label="Valor de la Propiedad"
                        type="number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={valorPropiedad}
                        onChange={(e) => setValorPropiedad(e.target.value)}
                    />
                    <TextField
                        label="Monto del Préstamo"
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
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                        >
                            Cargar Documentos
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={handleFileUpload}
                            />
                        </Button>
                    </Box>
                </Box>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Enviar Solicitud
                </Button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={successMessage || errorMessage}
            />
        </Container>
    );
};

export default Solicitud;
