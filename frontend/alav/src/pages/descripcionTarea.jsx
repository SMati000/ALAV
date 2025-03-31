import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import axiosInstance from './../../axiosConfig';

function DescripcionTarea() {
  const theme = useTheme();
  const { id } = useParams(); 
  const [datosTarea, setDatosTarea] = React.useState(null); 

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
            return "Desconocida";
    }
  }

  if (!datosTarea) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ paddingInline: '1rem', marginTop: '2rem' }}>
      <Paper
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
            Orden de trabajo N° {datosTarea.nroOrden}
          </Typography>
        </div>

        <Box sx={{ marginTop: '2rem', paddingInline:'2rem' }}>
          <Box sx={{ marginTop: '1rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight:'2rem' }}>
                <div style={{ display: 'flex', gap:'0.5rem'}}>
                    <Typography variant="body1"><strong>Fecha de inicio:</strong> {datosTarea.fechaInicio ? new Date(datosTarea.fechaInicio).toLocaleDateString('es-ES') : 'No definida'}</Typography>
                    <Typography variant="body1"> - </Typography>
                    <Typography variant="body1"><strong>Fecha de fin:</strong> {datosTarea.fechaFin ? new Date(datosTarea.fechaFin).toLocaleDateString('es-ES') : 'No definida'}</Typography>
                </div>
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
            </div>

            <div style={{display:'flex', gap:'2rem', justifyContent:'space-between', marginTop:'1rem'}}>
                <Typography variant="body1"><strong>Fecha:</strong> {datosTarea.fecha ? new Date(datosTarea.fecha).toLocaleDateString('es-ES') : 'No definida'} </Typography>
                <Typography variant="body1"><strong>Edición:</strong> {datosTarea.edicion}</Typography>
                <Typography variant="body1"><strong>Autorizado por:</strong> {datosTarea.autorizadoPor}</Typography>
            </div>

            <Typography variant="body1"><strong>Trabajadores:</strong> {datosTarea.trabajadores}</Typography>
            <Typography variant="body1"><strong>Descripción:</strong> {datosTarea.descripcion}</Typography>

            <div style={{display:'flex', justifyContent:'space-between'}}>    

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Equipo de protección:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.equipoProteccion.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
                      ))}
                    </ul> 
                </div>   
    
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Insumos utilizados:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.insumos.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
                      ))}
                    </ul> 
                </div>  

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Trabajos pendientes:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.trabajosPendientes.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
                      ))}
                    </ul> 
                </div>     

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Posibles mejoras:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosTarea.posiblesMejoras.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
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
  
export default DescripcionTarea;