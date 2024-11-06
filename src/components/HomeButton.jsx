import { IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/'); // Redirige a la ruta principal
    };

    const handleBackClick = () => {
        navigate(-1); // Redirige a la página anterior
    };

    return (
        <Box
            style={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                gap: '8px'
            }}
        >
            <IconButton onClick={handleBackClick} color="secondary">
                <ArrowBackIcon />
            </IconButton>
            <IconButton onClick={handleHomeClick} color="primary">
                <HomeIcon />
            </IconButton>
        </Box>
    );
};

export default NavigationButtons;

