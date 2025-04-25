import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import axiosInstance from '../../axiosConfig';
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BotonAtras from '../components/botonAtras';
import html2pdf from 'html2pdf.js';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Divider,
  Box,
  Grid,
  Chip,
  Stack
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DialogDelete from '../components/dialogDelete';

function DescripcionTarea() {
  const theme = useTheme();
  const { id } = useParams();
  const [datosTarea, setDatosTarea] = React.useState(null);
  const pdfRef = useRef(null);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

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
        console.error('Error al obtener la tarea:', error);
      }
    };
    fetchTareas();
  }, []);

  if (!datosTarea) return <Typography>Cargando...</Typography>;
  
  const actions = [
    {
      icon: <DownloadIcon />,
      name: "Descargar",
      color: "rgb(40, 167, 69)",
      onClick: exportToPDF,
    },
    {
      icon: <EditIcon />,
      name: "Editar",
      color: "rgb(0, 123, 255)",
      onClick: () => navigate(`/editar-tarea/${id}`),
    },
    {
      icon: <DeleteIcon />,
      name: "Borrar",
      color: "rgb(220, 53, 69)",
      onClick: () => setOpen(true),
    },
  ];

  return (
    <Box style={{ padding: '0', margin: '1rem' }}>
      <BotonAtras></BotonAtras>
      <SpeedDial
        ariaLabel="SpeedDial actions"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ color: action.color }}
          />
        ))}
      </SpeedDial>

      <Card sx={{ mx: 2, mt: 1, p: 2, borderRadius: 4, boxShadow: 4 }} ref={pdfRef}>
        <CardContent>
          <Stack direction="row" spacing={1} alignItems="center" mb={2}>
            <InfoIcon color="primary" />
            <Typography variant="h5" fontWeight="bold">Tarea N° {datosTarea.id}</Typography>
          </Stack>

          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Typography><strong>Creada:</strong> {new Date(datosTarea.fechaCreada).toLocaleDateString('es-ES').split('T')} </Typography>
              <Typography><strong>Periodicidad:</strong> {datosTarea.periodicidad || 'Sin datos'} {datosTarea.unidad || ''}</Typography>
              <Typography><strong>Departamento:</strong> {datosTarea.departamento || 'Sin datos'}</Typography>
              <Typography><strong>Edición:</strong> {datosTarea.edicion || 'Sin datos'}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ wordBreak: 'break-word' }}><strong>Descripción:</strong> {datosTarea.descripcion || 'Sin datos'}</Typography>
              <Typography sx={{ wordBreak: 'break-word' }}><strong>Autorizado por:</strong> {datosTarea.autorizadoPor || 'Sin datos'}</Typography>
              <Typography sx={{ wordBreak: 'break-word' }}><strong>Equipo protección:</strong> {datosTarea.equipoProteccion || 'Sin datos'}</Typography>
              <Typography sx={{ wordBreak: 'break-word' }}><strong>Trabajos pendientes:</strong> {datosTarea.trabajosPendientes || 'Sin datos'}</Typography>
              <Typography sx={{ wordBreak: 'break-word' }}><strong>Posibles mejoras:</strong> {datosTarea.posiblesMejoras || 'Sin datos'}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {datosTarea.trabajadores?.length > 0 && (
            <>
              <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                <PeopleIcon color="primary" />
                <Typography variant="h6">Trabajadores</Typography>
              </Stack>
              <Typography sx={{pl: 2}}>
                {datosTarea.trabajadores.map((trabajador) => `${trabajador.nombre} ${trabajador.apellido}`).join(', ')}
              </Typography>
            </>
          )}

          {datosTarea.idMaquina !== null && (
            <>
              <Stack direction="row" spacing={1} alignItems="center" mt={2} mb={1}>
                <BuildIcon color="primary" />
                <Typography variant="h6">Máquina</Typography>
              </Stack>
              <Typography sx={{pl: 2}}>CÓDIGO: {datosTarea.maquina.codigo}</Typography>
            </>
          )}

          {datosTarea.insumos?.length > 0 && (
            <>
              <Stack direction="row" spacing={1} alignItems="center" mt={2} mb={1}>
                <Inventory2Icon color="primary" />
                <Typography variant="h6">Insumos</Typography>
              </Stack>
              <Typography sx={{pl: 2}}>
                {datosTarea.insumos.map((insumo) => insumo.nombre).join(', ')}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <DialogDelete
        open={open}
        setOpen={setOpen}
        registros={"tareas"}
        registro={"tarea"}
        idRegistro={id}
      ></DialogDelete>
    </Box>
  );
}

export default DescripcionTarea;