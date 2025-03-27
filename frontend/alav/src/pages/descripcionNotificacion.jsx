import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function DescripcionNotificacion() {
  const theme = useTheme();
  const { id } = useParams(); 
  const [datosNotificacion, setDatosNotificacion] = React.useState(
    {
        "id": id,
        "departamento": "Mantenimiento",
        "nroOrden": 12345,
        "edicion": 1,
        "fecha": "2025-03-27",
        "trabajadores": "Juan Pérez, María López",
        "fechaInicio": "2025-03-25",
        "fechaFin": "2025-03-27",
        "autorizadoPor": "Carlos García",
        "equipoProteccion": "Casco, Guantes, Botas",
        "descripcion": "Revisión y mantenimiento del sistema eléctrico",
        "estado": "FINALIZADA_TOTALMENTE",
        "insumos": "Cableado, herramientas eléctricas",
        "trabajosPendientes": "Ninguno",
        "posiblesMejoras": "Mejorar la ventilación del sistema"
    }
  );

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

  return (
    <Box sx={{ paddingInline: '6rem', marginTop: '2rem' }}>
      <Paper
        sx={{
          padding: '2rem',
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
            Tarea de mantenimiento nro {datosNotificacion.nroOrden}
          </Typography>
        </div>

        <Box sx={{ marginTop: '2rem' }}>
          <Box sx={{ marginTop: '1rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
                
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight:'2rem' }}>
                <div style={{ display: 'flex', gap:'0.5rem'}}>
                    <Typography variant="body1"><strong>Fecha de inicio:</strong> {datosNotificacion.fechaInicio}</Typography>
                    <Typography variant="body1"> - </Typography>
                    <Typography variant="body1"><strong>Fecha de fin:</strong> {new Date(datosNotificacion.fechaFin).toLocaleDateString('es-ES').split('T')}</Typography>
                </div>
                <Typography variant="body1">
                    <span 
                        style={{
                            display: 'inline-block',
                            backgroundColor: getEstadoColor(datosNotificacion.estado),
                            color: 'white',
                            padding: '0.25rem 1rem',
                            borderRadius: '12px',
                            fontWeight: 'bold',
                        }}
                    >
                        {getNombreEstado(datosNotificacion.estado)}
                    </span>
                </Typography>
            </div>

            <Typography variant="body1"><strong>Descripción:</strong> {datosNotificacion.descripcion}</Typography>

            <div style={{display:'flex', gap:'2rem', justifyContent:'space-between'}}>
                <Typography variant="body1"><strong>Autorizado por:</strong> {datosNotificacion.autorizadoPor}</Typography>
                <Typography variant="body1"><strong>Departamento:</strong> {datosNotificacion.departamento}</Typography>
                <Typography variant="body1"><strong>Trabajos pendientes:</strong> {datosNotificacion.trabajosPendientes}</Typography>
                <Typography variant="body1"><strong>Posibles mejoras:</strong> {datosNotificacion.posiblesMejoras}</Typography>
            </div>

            <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'1rem'}}>
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Trabajadores:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosNotificacion.trabajadores.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
                      ))}
                    </ul> 
                </div>     

                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Equipo de protección:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosNotificacion.equipoProteccion.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo}</li>
                      ))}
                    </ul> 
                </div>   
    
                <div style={{display:'flex', flexDirection:'column'}}>
                    <Typography variant="body1"><strong>Insumos utilizados:</strong></Typography>
                    <ul style={{margin:'0.2rem', marginLeft:'0', paddingLeft:'2rem'}}>
                      {datosNotificacion.insumos.split(', ').map((equipo, index) => (
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
  
export default DescripcionNotificacion;