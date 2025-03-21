import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home'
import Navbar from './components/navbar'
import ListadoMaquinas from "./pages/listadoMaquinas";
import AgregarMaquina from "./pages/agregarMaquina";
import DescripcionMaquina from "./pages/descripcionMaquina";
import ListadoTecnicos from "./pages/listadoTecnicos";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-maquina" element={<ListadoMaquinas />} />
        <Route path="/agregar-maquina" element={<AgregarMaquina />} />
        <Route path="/descripcion-maquina" element={<DescripcionMaquina />} />
        <Route path="/listado-tecnicos" element={<ListadoTecnicos />} />
      </Routes>
    </Router>
  )
}

export default App
