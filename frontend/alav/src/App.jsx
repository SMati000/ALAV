import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home'
import Navbar from './components/navbar'
import ListadoMaquinas from "./pages/listadoMaquinas";
import AgregarMaquina from "./pages/agregarMaquina";
import DescripcionMaquina from "./pages/descripcionMaquina";
import ListadoTecnicos from "./pages/listadoTecnicos";
import AgregarTecnicos from "./pages/agregarTecnicos";
import EditarMaquina from "./pages/editarMaquina";
import ListadoTareas from "./pages/listadoTareas";
import AgregarTarea from "./pages/agregarTarea";
import EditarTarea from "./pages/editarTarea";
import EditarTecnico from "./pages/editarTecnico";
import ListadoInsumos from "./pages/listadoInsumos";
import AgregarInsumos from "./pages/agregarInsumos";
import EditarInsumos from "./pages/editarInsumo";
import ListadoOrdenes from './pages/listadoOrdenes';
import DescripcionOrden from "./pages/descripcionOrden"
import DescripcionTarea from './pages/descripcionTarea';
import DescripcionTecnico from "./pages/descripcionTecnico";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-maquina" element={<ListadoMaquinas />} />
        <Route path="/agregar-maquina" element={<AgregarMaquina />} />
        <Route path="/descripcion-maquina/:id" element={<DescripcionMaquina />} />
        <Route path="/editar-maquina/:id" element={<EditarMaquina />} />

        <Route path="/listado-tecnicos" element={<ListadoTecnicos />} />
        <Route path="/agregar-tecnicos" element={<AgregarTecnicos />} />
        <Route path="/editar-tecnico/:id" element={<EditarTecnico />} />
        <Route path="/descripcion-tecnico/:id" element={<DescripcionTecnico />} />
          
        <Route path="/listado-insumos" element={<ListadoInsumos />} />
        <Route path="/agregar-insumos" element={<AgregarInsumos/>} />
        <Route path="/editar-insumos/:id" element={<EditarInsumos />} />

        <Route path="/listado-tarea" element={<ListadoTareas />} />
        <Route path="/listado-tarea/:ids" element={<ListadoTareas />} />
        <Route path="/agregar-tarea" element={<AgregarTarea />} />
        <Route path="/descripcion-tarea/:id" element={<DescripcionTarea />} />
        <Route path="/editar-tarea/:id" element={<EditarTarea />} />

        <Route path="/listado-ordenes" element={<ListadoOrdenes />} />
        <Route path="/descripcion-orden/:id" element={<DescripcionOrden />} />
      </Routes>
    </Router>
  )
}

export default App
