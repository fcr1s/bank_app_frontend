import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Register from "./components/Register"; 
import NotFound from "./components/NotFound"; // Asegúrate de importar NotFound
import Options from "./components/Options"; // Asegúrate de importar Options
import Simulacion from "./components/Simulacion"; // Asegúrate de importar Simulacion
import Solicitud from './components/Solicitud';
import SeguimientoSolicitud from './components/SeguimientoSolicitud'; // Asegúrate de importar SeguimientoSolicitud
import Evaluacion from './components/Evaluacion';
import Evaluar from './components/Evaluar';
import Condiciones from './components/Condiciones';
import Prestamo from './components/Prestamos';
import HomeButton from './components/HomeButton';  

const App = () => {
  return (
      <Router>
          <div className="container">
              <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} /> 
                    <Route path="/options" element={<Options />} />
                    <Route path="/simulacion" element={<Simulacion />} />
                    <Route path="/solicitud" element={<Solicitud />} />
                    <Route path="/seguimiento" element={<SeguimientoSolicitud />} />
                    <Route path="/evaluar-solicitud" element={<Evaluacion />} />
                    <Route path="/evaluar/:solicitudId" element={<Evaluar />} />
                    <Route path="/condiciones/:id" element={<Condiciones />} />
                    <Route path="/prestamos" element={<Prestamo />} />
                    <Route path="/home" element={<HomeButton />} />
                    <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;


