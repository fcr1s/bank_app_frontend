import { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import ejecutivoService from '../services/ejecutivo.service';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton'; 

const Evaluar = () => {
    const navigate = useNavigate();
    const { solicitudId } = useParams(); 
    const [formData, setFormData] = useState({
        ingresosMensuales: '',
        buenHistorialCrediticio: false,
        antiguedadLaboral: '',
        totalDeudas: '',
        valorPropiedad: '',
        edadCliente: '',
        saldoCuenta: '',
        saldoConsistente: false, 
        totalDepositos: '',
        antiguedadCuenta: '',
        porcentajeRetiroReciente: ''
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Convertir valores a los tipos correctos
            await ejecutivoService.evaluarSolicitud(solicitudId, 
                parseFloat(formData.ingresosMensuales), 
                formData.buenHistorialCrediticio, 
                parseInt(formData.antiguedadLaboral), 
                parseFloat(formData.totalDeudas), 
                parseFloat(formData.valorPropiedad), 
                parseInt(formData.edadCliente), 
                parseFloat(formData.saldoCuenta), 
                formData.saldoConsistente, 
                parseFloat(formData.totalDepositos), 
                parseInt(formData.antiguedadCuenta), 
                parseFloat(formData.porcentajeRetiroReciente) 
            );
            alert('Evaluación enviada con éxito');
            navigate('/evaluar-solicitud');
        } catch (error) {
            console.error('Error al enviar la evaluación:', error);
            alert('Error al enviar la evaluación');
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '50px' }}>
            <HomeButton />
            <Typography variant="h4" align="center" gutterBottom>
                Evaluar Solicitud
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Ingresos Mensuales"
                    name="ingresosMensuales"
                    value={formData.ingresosMensuales}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Antigüedad Laboral (años)"
                    name="antiguedadLaboral"
                    value={formData.antiguedadLaboral}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Total Deudas"
                    name="totalDeudas"
                    value={formData.totalDeudas}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Valor Propiedad"
                    name="valorPropiedad"
                    value={formData.valorPropiedad}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Edad del Cliente"
                    name="edadCliente"
                    value={formData.edadCliente}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Saldo Cuenta"
                    name="saldoCuenta"
                    value={formData.saldoCuenta}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <Box>
                    <label>
                        <input
                            type="checkbox"
                            name="saldoConsistente"
                            checked={formData.saldoConsistente}
                            onChange={handleChange}
                        />
                        Saldo Consistente
                    </label>
                </Box>
                <TextField
                    label="Total en Depósitos"
                    name="totalDepositos"
                    value={formData.totalDepositos}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Antigüedad Cuenta (años)"
                    name="antiguedadCuenta"
                    value={formData.antiguedadCuenta}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <TextField
                    label="Porcentaje de Retiro Reciente"
                    name="porcentajeRetiroReciente"
                    value={formData.porcentajeRetiroReciente}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                />
                <Box>
                    <label>
                        <input
                            type="checkbox"
                            name="buenHistorialCrediticio"
                            checked={formData.buenHistorialCrediticio}
                            onChange={handleChange}
                        />
                        Buen Historial Crediticio
                    </label>
                </Box>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Enviar Evaluación
                </Button>
            </form>
        </Container>
    );
};

export default Evaluar;
