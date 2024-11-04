import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/'); // Redirige a la ruta principal
    };

    return (
        <IconButton 
            onClick={handleHomeClick} 
            style={{ position: 'absolute', top: 16, left: 16 }} // posicionar el botón
            color="primary"
        >
            <HomeIcon />
        </IconButton>
    );
};

export default HomeButton;
