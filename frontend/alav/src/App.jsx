import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home'
import Navbar from './components/navbar'
import ListadoMaquinas from "./pages/listadoMaquinas";
import AgregarMaquina from "./pages/agregarMaquina";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-maquina" element={<ListadoMaquinas />} />
        <Route path="/agregar-maquina" element={<AgregarMaquina />} />
      </Routes>
    </Router>
  )
}

export default App
