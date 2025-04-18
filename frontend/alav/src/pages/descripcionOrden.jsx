import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../axiosConfig';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import BotonAtras from '../components/botonAtras';
import html2pdf from 'html2pdf.js';

function DescripcionOrden() {
  const theme = useTheme();
  const { id } = useParams(); 
  const [datosTarea, setDatosTarea] = React.useState(null); 
  const pdfRef = useRef(null);
  const navigate = useNavigate();

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "FINALIZADA_TOTALMENTE":
          return theme.palette.success.main; 
      case "PENDIENTE":
          return theme.palette.info.main; 
      case "FINALIZADA_PARCIALMENTE":
          return theme.palette.warning.main; 
      default:
          return theme.palette.text.primary; 
    }
  };

  const exportToPDF = () => {
    if (pdfRef.current) {
      const element = pdfRef.current;
      html2pdf()
        .from(element)
        .set({
          filename: `descripcion-tarea-${id}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save();
    }
  };  

  React.useEffect(() => {  
    const fetchTareas = async () => {
      try {
        const response = await axiosInstance.get(`/tareas/${id}`);  
        setDatosTarea(response.data);  
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };
    fetchTareas(); 
  }, []);

  const getNombreEstado = (nombre) => {
    switch (nombre) {
        case "FINALIZADA_TOTALMENTE":
            return "Finalizada"; 
        case "PENDIENTE":
            return "Pendiente";
        case "FINALIZADA_PARCIALMENTE":
            return "Parcialmente finalizada";
        default:
            return "Sin datos";
    }
  }

  if (!datosTarea) return <Typography>Cargando...</Typography>;

  const actions = [
    { icon: <DownloadIcon />, name: "Descargar", color: "rgb(40, 167, 69)", onClick: () => exportToPDF()},
    { icon: <EditIcon />, name: "Editar", color: "rgb(0, 123, 255)", onClick: () => navigate(`/editar-tarea/${id}`) },
    { icon: <DeleteIcon />, name: "Borrar", color: "rgb(220, 53, 69)", onClick: () => handleDelete(id) },
  ];

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/tareas/${id}`);
      navigate('/listado-tarea');
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  return (
    <Box style={{padding:'0', margin:'1rem'}}>
      <BotonAtras></BotonAtras>
      <Paper
        ref={pdfRef}
        sx={{
          padding: '1rem',
          paddingBottom:'2.5rem',
          borderRadius: '12px',
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.palette.acento.main, padding: '1.5rem', borderRadius: '12px' }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              letterSpacing: '0.1rem',
              flex: '3',
              color: 'white',
            }}
          >
            Tarea N° {datosTarea.id}
          </Typography>
        </div>

        <Box sx={{ marginTop: '2rem', paddingInline:'2rem' }}>
          <Box sx={{ marginTop: '1rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap:'0.5rem'}}>
                    <Typography variant="body1"><strong>Fecha de creación:</strong> {new Date(datosTarea.fechaCreada).toLocaleDateString('es-ES')}</Typography>
                    <Typography>-</Typography>
                    <Typography variant="body1"><strong>Fecha de mantenimiento:</strong> {datosTarea.fecha ? new Date(datosTarea.fecha).toLocaleDateString('es-ES') : 'No definida'} </Typography>
                </div>
                <div style={{display:'flex', gap:'2rem', alignItems:'center'}}>
                  <Typography variant="body1">
                      <span 
                          style={{
                              display: 'inline-block',
                              backgroundColor: getEstadoColor(datosTarea.estado),
                              color: 'white',
                              padding: '0.25rem 1rem',
                              borderRadius: '12px',
                              fontWeight: 'bold',
                          }}
                      >
                          {getNombreEstado(datosTarea.estado)}
                      </span>
                  </Typography>
                  <Button variant="outlined" sx={{ color: theme.palette.acento.main, borderColor: theme.palette.acento.main }}>
                    Emitir orden
                  </Button>
                </div>
            </div>

            <Typography variant="body1"><strong>Descripción:</strong> {datosTarea.descripcion ?? 'Sin datos'}</Typography>

            <div style={{display:'flex', gap:'8rem', justifyContent:'space-between'}}>
                <div style={{display:'flex', flexDirection:'column', paddingRight:'4rem'}}>
                    <Typography variant="body1"><strong>Insumos utilizados:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.insumos.map((insumo, index) => (
                        <li key={index}>{insumo.nombre || 'Sin datos'}</li>
                      ))}
                    </ul> 
                  </div>  
            </div>

            <div style={{display:'flex', gap:'2rem', justifyContent:'space-between'}}>
              <Typography variant="body1"><strong>Edición:</strong> {datosTarea?.edicion || 'Sin datos'}</Typography>
              <Typography variant="body1"><strong>Autorizado por:</strong> {datosTarea?.autorizadoPor || 'Sin datos'}</Typography>
              <Typography variant="body1"><strong>Trabajadores:</strong> {datosTarea?.trabajadores || 'Sin datos'}</Typography>
            </div>

            <div style={{display:'flex', justifyContent:'space-between'}}>    
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Equipo de protección:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.equipoProteccion.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul> 
                </div>   

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Trabajos pendientes:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.trabajosPendientes.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul> 
                </div>     

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Posibles mejoras:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.posiblesMejoras.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul> 
                </div> 
            </div>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
  
export default DescripcionOrden;