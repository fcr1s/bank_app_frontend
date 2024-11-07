import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Register from "./components/Register"; 
import NotFound from "./components/NotFound"; 
import Options from "./components/Options"; 
import Simulacion from "./components/Simulacion"; 
import Solicitud from './components/Solicitud';
import SeguimientoSolicitud from './components/SeguimientoSolicitud'; 
import Evaluacion from './components/Evaluacion';
import Evaluar from './components/Evaluar';
import Condiciones from './components/Condiciones';
import Prestamos from './components/Prestamos'; 

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
                    <Route path="/prestamos" element={<Prestamos />} />
                    <Route path="*" element={<NotFound />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;


