import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
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
  const [datosOrden, setDatosOrden] = React.useState(null);
  const pdfRef = useRef(null);
  const navigate = useNavigate();
  const [mostrarOpcionesEstado, setMostrarOpcionesEstado] = useState(false)
  const actualizarEstado = async (nuevoEstado) => {
    try {
      await axiosInstance.patch(`/ordenesTrabajo/${id}`, { estado: nuevoEstado });
      setDatosOrden((prev) => ({ ...prev, estado: nuevoEstado }));
      setMostrarOpcionesEstado(false);

    } catch (error) {
      console.error("Error al actualizar el estado de la orden:", error);
    }

  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "PENDIENTE":
        return theme.palette.background.yellow;
      case "EMITIDA":
        return theme.palette.success.main;
      case "FINALIZADA":
        return theme.palette.primary.main;
      case "RECHAZADA":
        return theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  };

  const exportToPDF = async () => {
    if (pdfRef.current) {
      const boton = pdfRef.current.querySelector('#boton-emitir-orden');
      if (boton) {
        boton.style.display = 'none';

      }
      await new Promise((resolve) => setTimeout(resolve, 100));
      const element = pdfRef.current;
      await html2pdf()
        .from(element)
        .set({
          filename: `descripcion-orden-${id}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save();
      if (boton) {
        boton.style.display = 'inline-block';
      }
      if (datosOrden.estado === 'PENDIENTE') {
        try {
          await axiosInstance.patch(`/ordenesTrabajo/${id}`, { estado: 'EMITIDA' });
          setDatosOrden((prev) => ({ ...prev, estado: 'EMITIDA' }));
        } catch (error) {
          console.error('Error al emitir la orden de trabajo:', error);
        }
      }
    }
  };

  React.useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await axiosInstance.get(`/ordenesTrabajo/${id}`);
        setDatosOrden(response.data);
      } catch (error) {
        console.error('Error al obtener la orden de trabajo:', error);
      }
    };
    fetchOrdenes();
  }, []);

  const getNombreEstado = (nombre) => {
    switch (nombre) {
      case "PENDIENTE":
        return "Pendiente";
      case "EMITIDA":
        return "Emitida";
      case "FINALIZADA":
        return "Finalizada";
      case "RECHAZADA":
        return "Rechazada";
      default:
        return "Sin datos";
    }
  }

  if (!datosOrden) return <Typography>Cargando...</Typography>;

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/ordenesTrabajo/${id}`);
      navigate('/listado-ordenes');
    } catch (error) {
      console.error('Error al eliminar la orden de trabajo:', error);
    }
  };


  return (
    <div>
      {mostrarOpcionesEstado && (
        <Box
          sx={{
            position: 'absolute',
            top: '30%', 
            left: '50%',
            transform: 'translate(-50%, -30%)',
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            boxShadow: 5,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            filter: mostrarOpcionesEstado ? 'none' : 'blur(4px)',
            transition: 'filter 0.3s ease'
          }}
        >

          {datosOrden.estado === 'PENDIENTE' && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Seleccioná un nuevo estado</Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() => actualizarEstado('RECHAZADA')}
                sx={{ width: '100%', fontWeight: 'bold', borderRadius: '12px' }}
              >
                Rechazada
              </Button>
            </>
          )}
          {datosOrden.estado === 'EMITIDA' && (
            <>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Seleccioná un nuevo estado</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => actualizarEstado('FINALIZADA')}
                sx={{ width: '100%', fontWeight: 'bold', borderRadius: '12px' }}
              >
                Finalizada
              </Button>
            </>
          )}
          {datosOrden.estado === 'FINALIZADA' || datosOrden.estado === 'RECHAZADA' && (
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>No es posible cambiar de estado</span>
          )}
          <Button
            variant="text"
            onClick={() => setMostrarOpcionesEstado(false)}
            sx={{ color: 'gray', textTransform: 'none'}}
          >
            Cancelar
          </Button>
        </Box>
      )}
      {mostrarOpcionesEstado && (
        <Button
          onClick={() => setMostrarOpcionesEstado(prev => !prev)}
          variant='contained'
          sx={{
            position: 'absolute',
            top: '260px',
            right: '65px',
            backgroundColor: getEstadoColor(datosOrden.estado),
            display: 'inline-block',
            color: 'white',
            borderRadius: '12px',
            fontWeight: 'bold',
            paddingInline: '1.5rem',
            fontSize: '1.3rem',
            letterSpacing: '0.05rem',
            zIndex: 10,
            '&:hover': {
              backgroundColor: getEstadoColor(datosOrden.estado),
              opacity: 0.85
            }
          }}
        >
          {getNombreEstado(datosOrden.estado)}
        </Button>
      )}

      <Box style={{ padding: '0', margin: '1rem', minHeight: 'calc(100vh - 13vh)', filter: mostrarOpcionesEstado ? 'blur(4px)' : 'none', transition: 'filter 0.3s ease', position: 'relative' }}>
        <BotonAtras></BotonAtras>
        <Box className="solo-pantalla">
          <Paper
            ref={pdfRef}
            sx={{
              padding: '1rem',
              paddingBottom: '2.5rem',
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
                Orden N° {datosOrden.id}
              </Typography>
            </div>

            <Box sx={{ marginTop: '2rem', paddingInline: '2rem' }}>
              <Box sx={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Typography variant="body1"><strong>Tarea:</strong> {datosOrden.idTarea} </Typography>
                    <Typography>-</Typography>
                    <Typography variant="body1"><strong>Fecha de creación:</strong> {datosOrden.fechaInicio.split('T')[0].split('-').reverse().join('/')}</Typography>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {datosOrden.estado !== 'FINALIZADA' && datosOrden.estado !== 'RECHAZADA' && datosOrden.estado !== 'EMITIDA' && (
                      <Button id='boton-emitir-orden' variant="outlined" sx={{ fontWeight: 'bold', color: theme.palette.acento.main, borderColor: theme.palette.acento.main }} onClick={exportToPDF}>Emitir orden</Button>
                    )}
                    <Typography variant="body1">
                      <Button
                        onClick={() => setMostrarOpcionesEstado(prev => !prev)}
                        variant='contained'
                        sx={{
                          backgroundColor: getEstadoColor(datosOrden.estado),
                          display: 'inline-block',
                          color: 'white',
                          borderRadius: '12px',
                          fontWeight: 'bold',
                          paddingInline: '1.5rem',
                          fontSize: '1.3rem',
                          letterSpacing: '0.05rem',
                          '&:hover': {
                            backgroundColor: getEstadoColor(datosOrden.estado),
                            opacity: 0.85
                          }
                        }}
                      >
                        {getNombreEstado(datosOrden.estado)}
                      </Button>
                    </Typography>
                  </div>
                </div>

                <Typography variant="body1"><strong>Descripción:</strong> {datosOrden.descripcion ?? 'Sin datos'}</Typography>

                <div style={{ display: 'flex', gap: '8rem', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '4rem' }}>
                    <Typography variant="body1"><strong>Insumos utilizados:</strong></Typography>
                    <ul style={{ margin: '0.2rem', marginLeft: '0', paddingLeft: '2rem' }}>
                      {/* {datosOrden.insumos.map((insumo, index) => (
                        <li key={index}>{insumo.nombre || 'Sin datos'}</li>
                      ))} */}
                    </ul>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'space-between' }}>
                  <Typography variant="body1"><strong>Edición:</strong> {datosOrden?.edicion || 'Sin datos'}</Typography>
                  <Typography variant="body1"><strong>Autorizado por:</strong> {datosOrden?.autorizadoPor || 'Sin datos'}</Typography>
                  <Typography variant="body1"><strong>Trabajadores:</strong> {datosOrden?.trabajadores || 'Sin datos'}</Typography>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1"><strong>Equipo de protección:</strong></Typography>
                    <ul style={{ margin: '0.2rem', marginLeft: '0', paddingLeft: '2rem' }}>
                      {datosOrden.equipoProteccion.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1"><strong>Trabajos pendientes:</strong></Typography>
                    <ul style={{ margin: '0.2rem', marginLeft: '0', paddingLeft: '2rem' }}>
                      {datosOrden.trabajosPendientes.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="body1"><strong>Posibles mejoras:</strong></Typography>
                    <ul style={{ margin: '0.2rem', marginLeft: '0', paddingLeft: '2rem' }}>
                      {datosOrden.posiblesMejoras.split(', ').map((equipo, index) => (
                        <li key={index}>{equipo || 'Sin datos'}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Box>
            </Box>
          </Paper>
        </Box>

        <Box className="solo-pdf" style={{ display: 'none' }}>
          <Paper
            ref={pdfRef}
            sx={{
              padding: '1rem',
              paddingBottom: '2.5rem',
              borderRadius: '12px',
              boxShadow: 3,
              backgroundColor: 'white', // mejor blanco para pdf
            }}
          >
            {/* {1era fila} */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
                <Typography variant="body1"><strong>ALAV. SRL</strong></Typography>
              </Box>
              <Box sx={{}}>
                <Box sx={{ height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black', borderBottom: 'none' }}>
                  <Typography><strong>Departamento de Ingeniería</strong></Typography>
                </Box>
                <Box sx={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid black' }}>
                  <Typography variant="body1"><strong>Orden de Trabajo</strong></Typography>
                </Box>
              </Box>


              <Box
                sx={{
                  border: '2px solid black',
                  padding: '0.2rem 0 0 0.3rem ',
                }}
              >
                <Typography><strong>Orden Nº:</strong> {datosOrden.id} <br />
                  <strong>Edición:</strong> {datosOrden.edicion ?? 'Sin datos'} <br />
                  <strong>Fecha:</strong> {datosOrden.fechaInicio.split('T')[0].split('-').reverse().join('/')}
                </Typography>


              </Box>
            </Box>


            {/* {2da fila} */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2, mb: 2 }}>
              <Box sx={{ height: '100px', marginRight: '-0.3rem' }}>
                <Box sx={{ height: '30%', display: 'flex', alignItems: 'center', justifyContent: 'left', border: '2px solid black', paddingLeft: '0.5rem' }}>
                  <Typography><strong>Departamento de Ingeniería</strong></Typography>
                </Box>
                <Box sx={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', paddingTop: '0.5rem' }}>
                  <Box sx={{ height: '100%', width: '100%', padding: '0.2rem', border: '2px solid black' }}>
                    <Typography><strong>Fecha y Hora Inicio:</strong> {datosOrden.fechaInicio ? datosOrden.fechaInicio.split('T')[0].split('-').reverse().join('/') : 'Sin datos'}</Typography>
                  </Box>
                  <Box sx={{ height: '100%', width: '100%', padding: '0.2rem', border: '2px solid black' }}>
                    <Typography><strong>Fecha y Hora Final:</strong> {datosOrden.fechaFin ? datosOrden.fechaFin.split('T')[0].split('-').reverse().join('/') : 'Sin datos'} </Typography>
                  </Box>
                </Box>
              </Box>


              <Box
                sx={{
                  border: '2px solid black',
                  padding: '0.5rem',
                  marginLeft: '0.3rem',
                }}
              >
                <Typography><strong>Autorizó: </strong> {datosOrden.autorizadoPor ?? 'Sin datos'} <br /></Typography>
              </Box>
            </Box>


            {/* Equipo de protección */}
            <Box
              sx={{
                height: '100px',
                border: '2px solid black',
                padding: '0.5rem',
                mb: 2,
              }}
            >
              <Typography><strong>Equipo de Protección:</strong> {datosOrden.equipoProteccion ?? 'Sin datos'}</Typography>
            </Box>


            {/* Tabla de descripción, estado, insumos */}
            <table style={{ width: '100%', border: '2px solid black', marginBottom: '2rem', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '2px solid black', padding: '8px' }}>Descripción</th>
                  <th style={{ border: '2px solid black', padding: '8px' }}>Estado de la Tarea</th>
                  <th style={{ border: '2px solid black', padding: '8px' }}>Insumos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '2px solid black', padding: '8px', height: '200px' }}>{datosOrden.descripcion ?? 'Sin datos'}</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{datosOrden.estado ? getNombreEstado(datosOrden.estado) : 'Sin datos'}</td>
                  <td style={{ border: '2px solid black', padding: '8px' }}>{datosOrden.insumos ?? 'Sin datos'}</td>
                </tr>
              </tbody>
            </table>


            {/* Trabajos pendientes y mejoras */}
            <Box
              sx={{
                height: '250px',
                border: '2px solid black',
                padding: '0.5rem',
                mb: 2,
              }}
            >
              <Typography><strong>Trabajos Pendientes y Propuestas de Mejora:</strong></Typography>
              <Typography>
                {datosOrden.trabajosPendientes ?? 'Sin datos'}
                <br />
                {datosOrden.posiblesMejoras ?? ''}
              </Typography>
            </Box>


            {/* Firma */}
            <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
              <Typography><strong>Firma Trabajador/es:</strong></Typography>
            </Box>
          </Paper>
        </Box>

      </Box>
    </div>
  );
}

export default DescripcionOrden;