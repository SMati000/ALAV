import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/home'
import Navbar from './components/navbar'
import ListadoMaquinas from "./pages/listadoMaquinas";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listado-maquina" element={<ListadoMaquinas />} />
      </Routes>
    </Router>
  )
}

export default App
