// Options.jsx
import { Container, Typography, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeButton from './HomeButton'; 

const Options = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const { name } = location.state || { name };
    

    return (
        <Container style={{ marginTop: '20px' }}>
            <HomeButton />
            {/* Título principal */}
            <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                PrestaBanco
            </Typography>
            {/* Bienvenida personalizada */}
            <Typography variant="h5" align="center" gutterBottom>
                Bienvenido, {name}!
            </Typography>
            <Typography align="center" variant="h6" gutterBottom>
                ¿Qué deseas hacer?
            </Typography>
            
            {/* Botones con información debajo */}
            <Box textAlign="center">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/solicitud')}
                    style={{ margin: '10px' }}
                >
                    Iniciar Solicitud
                </Button>
                <Typography variant="body2" style={{ marginBottom: '20px' }}>
                    Comienza el proceso para solicitar tu préstamo hipotecario.
                </Typography>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate('/simulacion')}
                    style={{ margin: '10px' }}
                >
                    Simular Crédito
                </Button>
                <Typography variant="body2" style={{ marginBottom: '20px' }}>
                    Calcula las cuotas y condiciones para tu crédito hipotecario.
                </Typography>

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => navigate('/seguimiento')}
                    style={{ margin: '10px' }}
                >
                    Seguimiento de Solicitud
                </Button>
                <Typography variant="body2" style={{ marginBottom: '20px' }}>
                    Revisa el estado actual de tu solicitud de préstamo.
                </Typography>

                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => navigate('/prestamos')}
                    style={{ margin: '10px' }}
                >
                    Préstamos
                </Button>
                <Typography variant="body2" style={{ marginBottom: '20px' }}>
                    Aquí podra ver el detalle de sus prestamos aprobados.
                </Typography>
            </Box>
        </Container>
    );
};

export default Options;
